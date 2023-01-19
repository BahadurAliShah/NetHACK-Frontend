/**
 * Genric function to make api calls with method post
 * @param {string} url  API end point to call
 * @param {function(*): *} responseSuccess  Call-back function to get success response from api call
 * @param {function(*): void} responseError  Call-back function to get error response from api call
 * @param {apiPost} requestHeader  Request header to be send to api
 * @param {apiPost} body data to be send through api
 */

export async function apiPost(
    url: string,
    body: object,
    responseSuccess: (res: object) => void,
    responseError: (error: object) => void,
    requestHeader = {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
) {
    fetch(url, {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify(body)
    })
        .then(errorHandler)
        .then((response: any) => response.json())
        .then(json => responseSuccess(json))
        .catch(error => responseError(error));
}

export async function apiPostFormData(
    url: string,
    body: FormData,
    responseSuccess: (res: object) => void,
    responseError: (error: object) => void,
    requestHeader = {
        'Content-Type': 'multipart/form-data'
    }
) {
    fetch(url, {
        method: 'POST',
        headers: requestHeader,
        body: body
    })
        .then(errorHandler)
        .then((response: any) => response.json())
        .then(json => responseSuccess(json))
        .catch(error => responseError(error));
}

export async function apiGet(url: string, success: (res: object) => void, responseError: (error: object) => void, requestHeader = { 'Content-Type': 'application/json' }) {
    fetch(url, {
        method: 'GET',
        headers: requestHeader
    })
        .then(errorHandler)
        .then((response: any) => response.json())
        .then(json => success(json))
        .catch(error => responseError(error));
}

//Error Handler
/**
 *
 * @param {errorHandler} response Generic function to handle error occur in api
 */
const errorHandler = (response: {status: number, statusText: any}) => {
    if (response.status == 1 || response.status == 200) {
        return Promise.resolve(response);
    } else {
        var error: any = new Error(response.statusText || response.status);
        error.response = response;
        return Promise.reject(error);
    }
};
