const handleOkResponse = (response, onSuccess) => {
    console.log(response);
    if (!response.ok) return false;
    if (!onSuccess) return true;

    if (response.status === 204) {
        onSuccess();
        return true;
    }
    response.json().then(payload => onSuccess(payload));
    return true;
}

const handle4xxResponse = (response, onErrors) => {
    if (response.status < 400 || response.status >= 500) return false;
    if (onErrors) response.json().then(onErrors);
    return true;
}

const handleResponse = (response, onSuccess, onErrors) => {
    if (handleOkResponse(response, onSuccess)) return;
    if (handle4xxResponse(response, onErrors)) return;
    throw new Error("Error");
}

const config = (method, body) => {
    const config = {};
    config.method = method;
    if (body) {
        if (body instanceof FormData) {
            config.body = body;
        } else  {
            config.headers = {'Content-Type': 'application/json'};
            config.body = JSON.stringify(body);
        }
    }
    return config;
}

export const appFetch = (path, method, body, onSuccess, onErrors) => {
    fetch(`http://localhost:3001${path}`, config(method, body))
        .then(response => handleResponse(response, onSuccess, onErrors))
        .catch(onErrors);
}