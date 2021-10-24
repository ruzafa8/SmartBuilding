import os
import tensorflow as tf
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as viz_utils
from object_detection.builders import model_builder
from object_detection.utils import config_util

import cv2 
import numpy as np
from matplotlib import pyplot as plt

import uuid
import easyocr



paths = {
    # 'WORKSPACE_PATH': os.path.join('Tensorflow', 'workspace'),
    # 'SCRIPTS_PATH': os.path.join('Tensorflow','scripts'),
    # 'APIMODEL_PATH': os.path.join('Tensorflow','models'),
    # 'ANNOTATION_PATH': os.path.join('Tensorflow', 'workspace','annotations'),
    # 'IMAGE_PATH': os.path.join('Tensorflow', 'workspace','images'),
    # 'MODEL_PATH': os.path.join('Tensorflow', 'workspace','models'),
    # 'PRETRAINED_MODEL_PATH': os.path.join('Tensorflow', 'workspace','pre-trained-models'),
    # 'CHECKPOINT_PATH': os.path.join('Tensorflow', 'workspace','models',CUSTOM_MODEL_NAME), 
    # 'OUTPUT_PATH': os.path.join('Tensorflow', 'workspace','models',CUSTOM_MODEL_NAME, 'export'), 
    # 'TFJS_PATH':os.path.join('Tensorflow', 'workspace','models',CUSTOM_MODEL_NAME, 'tfjsexport'), 
    # 'TFLITE_PATH':os.path.join('Tensorflow', 'workspace','models',CUSTOM_MODEL_NAME, 'tfliteexport'), 
    # 'PROTOC_PATH':os.path.join('Tensorflow','protoc'),
    'OBJECT_DETECTION': os.path.join('models', 'research', 'object_detection'),
    'DEFAULT_IMG_PATH': "Results/"
 }


files = {
    'PIPELINE_CONFIG':os.path.join(paths['OBJECT_DETECTION'], 'training', 'pipeline.config'),
    #'TF_RECORD_SCRIPT': os.path.join(paths['SCRIPTS_PATH'], TF_RECORD_SCRIPT_NAME), 
    'LABELMAP': os.path.join(paths['OBJECT_DETECTION'], 'training', 'label_map.pbtxt')
}

category_index = label_map_util.create_category_index_from_labelmap(files['LABELMAP'])

IMAGE_PATH = os.path.join('Images', 'Image4.jpg')

#########TRESHOLDS########
detection_threshold = 0.1
region_threshold = 0.5
##########################



# Prevent GPU complete consumption
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    try: 
        tf.config.experimental.set_virtual_device_configuration(
            gpus[0], [tf.config.experimental.VirtualDeviceConfiguration(memory_limit=512)])
    except RunTimeError as e:
        print(e)


# Load pipeline config and build a detection model
configs = config_util.get_configs_from_pipeline_file(files['PIPELINE_CONFIG'])
detection_model = model_builder.build(model_config=configs['model'], is_training=False)

# Restore checkpoint
ckpt = tf.compat.v2.train.Checkpoint(model=detection_model)
ckpt.restore(os.path.join(paths['OBJECT_DETECTION'], 'training', 'ckpt-51')).expect_partial()

#@tf.function

def detect_fn(image):
    image, shapes = detection_model.preprocess(image)
    prediction_dict = detection_model.predict(image, shapes)
    detections = detection_model.postprocess(prediction_dict, shapes)
    return detections

def runDetection(path=IMAGE_PATH, r_threshold=region_threshold, returnPath=paths['DEFAULT_IMG_PATH'], export=True, extension='.jpg', imageData=None):
    img = None
    image_np = None

    # if imageData:
    #     img = cv2.imread(imageData)
    # else:
    #     img = cv2.imread(path)

    if imageData is not None:
        print('Image data found')
        image_np = np.array(imageData)
    else:
        print('Guided by image')
        img = cv2.imread(path)
        image_np = np.array(img)
        
    # image_np = np.array(img)

    input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.float32)
    detections = detect_fn(input_tensor)

    num_detections = int(detections.pop('num_detections'))
    detections = {key: value[0, :num_detections].numpy()
                for key, value in detections.items()}
    detections['num_detections'] = num_detections

    # detection_classes should be ints.
    detections['detection_classes'] = detections['detection_classes'].astype(np.int64)

    label_id_offset = 1
    image_np_with_detections = image_np.copy()

    viz_utils.visualize_boxes_and_labels_on_image_array(
                image_np_with_detections,
                detections['detection_boxes'],
                detections['detection_classes']+label_id_offset,
                detections['detection_scores'],
                category_index,
                use_normalized_coordinates=True,
                max_boxes_to_draw=5,
                min_score_thresh=.8,
                agnostic_mode=False)

    def filter_text(region, ocr_result, region_threshold):
        rectangle_size = region.shape[0]*region.shape[1]
        
        plate = [] 
        for result in ocr_result:
            length = np.sum(np.subtract(result[0][1], result[0][0]))
            height = np.sum(np.subtract(result[0][2], result[0][1]))
            
            if length*height / rectangle_size > region_threshold:
                plate.append(result[1])
        return plate


    def ocr_it(image, detections, detection_threshold, region_threshold):
        
        # Scores, boxes and classes above threhold
        scores = list(filter(lambda x: x> detection_threshold, detections['detection_scores']))
        boxes = detections['detection_boxes'][:len(scores)]
        classes = detections['detection_classes'][:len(scores)]

        # Full image dimensions
        width = image.shape[1]
        height = image.shape[0]

        # Apply ROI filtering and OCR
        for idx, box in enumerate(boxes):
            roi = box*[height, width, height, width]
            region = image[int(roi[0]):int(roi[2]),int(roi[1]):int(roi[3])]
            reader = easyocr.Reader(['en'])
            ocr_result = reader.readtext(region)
            
            text = filter_text(region, ocr_result, region_threshold)
            
            #plt.imshow(cv2.cvtColor(region, cv2.COLOR_BGR2RGB))
            #plt.show()
            if export:
                print(text)
            else:
                print('Ready')

            return text, region

    try:
        text, region = ocr_it(image_np_with_detections, detections, detection_threshold, r_threshold)
    except:
        print('No lincences recognized')
        return False

    # plt.imshow(cv2.cvtColor(image_np_with_detections, cv2.COLOR_BGR2RGB))
    # plt.show()
    #cv2.putText(image_np_with_detections, text, (10, 500), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
    if export:
        #print(returnPath)
        uuidN = uuid.uuid1()
        print(uuidN)
        if returnPath == paths['DEFAULT_IMG_PATH']:
            if os.path.exists(paths['DEFAULT_IMG_PATH']):
                cv2.imwrite(paths['DEFAULT_IMG_PATH'] + '{}{}'.format(uuidN, extension), image_np_with_detections)
            else:
                os.makedirs(paths['DEFAULT_IMG_PATH'])
                cv2.imwrite(paths['DEFAULT_IMG_PATH'] + '{}{}'.format(uuidN, extension), image_np_with_detections)
        else:
            try:
                cv2.imwrite(returnPath + '/{}{}'.format(uuidN, extension), image_np_with_detections)
            except:
                print('Path non existant')
                return "error"


        with open('{}/{}.txt'.format(returnPath, uuidN), 'w') as f:
            for t in text:
                f.write(t + ' ')

        return text

    else:
        return text