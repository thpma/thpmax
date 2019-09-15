import { ARTICLE_UPDATE_LIST } from "../actions/article";

const initialState = {
  list: [],
  total: 0,
  now: 0,
  page: 0,
  maxpage: 0
};

export default function article(state = initialState, { type, payload }) {
  switch (type) {
    case ARTICLE_UPDATE_LIST:
      return {
        ...state,
        list: payload.list,
        total: payload.total,
        page: payload.page,
        maxpage: payload.maxpage
      };
    default:
      return state;
  }
}
