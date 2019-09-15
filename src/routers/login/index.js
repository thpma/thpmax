import React, { useRef, useState } from "react";
import { userLogin } from "../../api/request";
import { message, Button } from "antd";
import { UpdateUserStatus } from "../../actions/user";
import { connect } from "react-redux";

import "./index.less";

const Index = ({ history, UpdateUserStatus }) => {
  const [loading, setLoading] = useState(false);
  const username = useRef(null);
  const password = useRef(null);

  function logged() {
    UpdateUserStatus();
    setTimeout(() => {
      history.push("/");
    }, 500);
  }

  function handleLogin() {
    if (!username.current.value || !password.current.value) {
      return;
    }
    setLoading(true);
    userLogin({
      username: username.current.value,
      password: password.current.value
    }).then(res => {
      if (res.err === "LOGGED") {
        message.info("你已经登录了!");
        logged();
      } else if (res.err === "USER_NOT_EXIST") {
        message.warning("错误的用户名");
        setLoading(false);
      } else if (res.err === "PASSWORD_INCORRECT") {
        message.warning("密码错误");
        setLoading(false);
      } else if (res.err === "DATABASE_ERROR") {
        message.warning("目前暂时不能登录");
        setLoading(false);
      } else if (res.ok) {
        message.info("登录成功");
        logged();
      }
    });
  }

  return (
    <div className="login-container">
      <input ref={username} type="text" placeholder="用户名" />
      <input ref={password} type="password" placeholder="密码" />
      <Button onClick={handleLogin} loading={loading} type="danger">
        登录
      </Button>
    </div>
  );
};

export default connect(
  ({}) => ({}),
  { UpdateUserStatus }
)(Index);
