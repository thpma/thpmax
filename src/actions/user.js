export const USER_TEST = "user:test";

export function UserTest() {
  return { type: USER_TEST, payload: "bbab" };
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
