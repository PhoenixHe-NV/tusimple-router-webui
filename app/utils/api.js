const basePath = '/api/v1';
const postHeader = new Headers();
postHeader.append('Content-Type', 'application/json');

function handleResponse(rsp) {
  return new Promise((resolve, reject) => {
    const handleError = (error) => reject({
      status: rsp.status,
      headers: rsp.headers,
      error,
    });
    if (rsp.ok) {
      rsp.json().then(resolve).catch(handleError);
    } else {
      rsp.text().then(handleError).catch(handleError);
    }
  });
}


export default class api {

  getUrl(u, params) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) =>
      searchParams.append(key, params[key]));
    return `${u}?${searchParams.toString()}`;
  }

  static get = (url) =>
    fetch(basePath + url, {
      method: 'GET',
      timeout: 500,
    }).then(handleResponse);

  static post = (url, data = {}) =>
    fetch(basePath + url, {
      method: 'POST',
      timeout: 500,
      headers: postHeader,
      body: JSON.stringify(data),
    }).then(handleResponse);
}
