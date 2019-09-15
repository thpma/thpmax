import { getArticleList } from "../api/request";

export const ARTICLE_UPDATE_LIST = "article:update_list";

export function articleGetList(page) {
  return dispatch => {
    getArticleList({ page: page }).then(res => {
      if (res.ok) {
        if (res.list === null) {
          res.list = [];
        }
        res.list.forEach((v, k) => {
          res.list[k].Category = v.Category.split(",").map(Number);
        });
        let maxpage = Math.ceil(res.total / 20);
        dispatch({
          type: ARTICLE_UPDATE_LIST,
          payload: {
            list: res.list,
            total: res.total,
            now: new Date().getTime(),
            page: page,
            maxpage: maxpage
          }
        });
      }
    });
  };
}
