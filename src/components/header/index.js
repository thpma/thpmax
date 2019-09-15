import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import "./index.less";

const Index = ({ location }) => {
  const [state, _] = useState([
    { path: "/", name: "首页" },
    { path: "/login", name: "登录" }
  ]);

  return (
    <div className="header-container">
      <ul className="header-container-navBar">
        {state.map((v, k) => (
          <li key={k}>
            <Link
              to={v.path}
              className={`${
                location.pathname === v.path
                  ? "header-container-navBar-actived"
                  : ""
              }`}
            >
              {v.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(Index);
