import { USER_UPDATE_STATUS } from "../actions/user";

const initialState = {
  logged: false
};

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case USER_UPDATE_STATUS:
      return { ...state, logged: payload.logged };
    default:
      return state;
  }
}
