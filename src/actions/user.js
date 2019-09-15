export const USER_UPDATE_STATUS = "user:update_status";

export function UpdateUserStatus() {
  return { type: USER_UPDATE_STATUS, payload: { logged: true } };
}

// export function UserTest(sid) {
//   return dispatch => {
//     fetch(`/blog/basicinfos?SID=${sid}`)
//       .then(res => res.json())
//       .catch(err => console.error(err))
//       .then(result => {
//         if (result.err === "NOT_LOGGED") {
//           setCookie("SID", "", 0);
//         } else {
//           dispatch({
//             type: UPDATE_USER_INFOS,
//             payload: result
//           });
//         }
//       });
//   };
// }
