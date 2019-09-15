import request, {
  REQUEST_METHOD_GET,
  REQUEST_METHOD_POST,
  REQUEST_METHOD_FILE
} from "./config";

export function userLogin(values) {
  return request("/blog/login", REQUEST_METHOD_POST, values);
}

export function createArticle(values) {
  return request("/blog/article/create", REQUEST_METHOD_FILE, values);
}

export function getArticleList(values) {
  return request(`/blog/article/list`, REQUEST_METHOD_GET, values);
}

export function getArticleDetails(values) {
  return request(`/blog/article/get`, REQUEST_METHOD_GET, values);
}
