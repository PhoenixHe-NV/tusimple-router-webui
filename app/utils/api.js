const basePath = '/api/v1';
const postHeader = new Headers();
postHeader.append('Content-Type', 'application/json');

export default class api {
  static get = (url) => fetch(basePath + url)
    .then((rsp) => rsp.json());

  static post = (url, data) => fetch(basePath + url, {
    method: 'POST',
    headers: postHeader,
    body: JSON.stringify(data),
  }).then((rsp) => rsp.json());
}
