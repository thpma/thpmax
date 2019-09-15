const baseUrl = "http://localhost:8081";

export const REQUEST_METHOD_GET = "GET";
export const REQUEST_METHOD_POST = "POST";
export const REQUEST_METHOD_FILE = "FILE";

export default function request(url, method, values) {
  let options = {
    method: method,
    headers: { "auth-token": localStorage.auth }
  };
  if (method === REQUEST_METHOD_POST) {
    options.body = JSON.stringify(values);
    options.headers["Content-Type"] = "application/json";
  } else if (method === REQUEST_METHOD_GET) {
    let params = "";
    for (let key in values) {
      params = params + `${key}=${values[key]}&`;
    }
    params = params.substring(0, params.length - 1);
    url = `${url}?${params}`;
  } else if (method === REQUEST_METHOD_FILE) {
    let obj = new FormData();
    for (let key in values) {
      obj.append(key, values[key]);
    }
    options.body = obj;
    options.method = REQUEST_METHOD_POST;
  }
  return fetch(`${baseUrl}${url}`, options).then(res => res.json());
}
