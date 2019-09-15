export const categorys = [
  { name: "React", color: "#2db7f5" },
  { name: "JavaScript", color: "#108ee9" },
  { name: "Golang", color: "#f50" }
];

export function isUserLogged() {
  return localStorage.auth ? true : false;
}

export function GetObjectUrl(file) {
  let url = null;
  if (window.createObjcectURL != undefined) {
    url = window.createOjcectURL(file);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

export function formatDate(date) {
  let d = new Date(date);
  let month =
    d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();

  let times =
    d.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    min +
    ":" +
    sec;

  return times;
}
