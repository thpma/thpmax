import { USER_TEST } from "../actions/user";

const initialState = {};

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case USER_TEST:
      return { ...state, name: payload };
    default:
      return state;
  }
}
