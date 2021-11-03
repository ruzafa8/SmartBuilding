import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import { CustomGallery, Item, DefaultLayout } from 'react-photoswipe-gallery'
import { useRef } from 'react'
import styled from 'styled-components'
import Logo from '../../../logo.png';

const Image = styled.img`
    width:242px;
    margin:10px;
`
const Photo = ({url}) => <Item
    original={url}
    thumbnail={url}
    width="1024"
    height="768"
    >{({ ref, open }) => <Image ref={ref} onClick={open} src={url}/>}
</Item>

const MyGallery = () => {
  const layoutRef = useRef();

  return <>
    <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>
        <div style={{display:"flex",flexWrap:"wrap"}}>{
        Array.from({ length:10}, (_, i) => `http://192.168.0.33/${i}.jpg`)
            .map(url => <Photo url={url}/>)
    }</div>
    </CustomGallery>

    <DefaultLayout
      shareButton={false}
      fullscreenButton={false}
      zoomButton={false}
      ref={layoutRef}
    />
  </>
}
export default MyGallery;