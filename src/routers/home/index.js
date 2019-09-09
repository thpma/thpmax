import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { UserTest } from "../../actions/user";

import "./index.less";

const Index = props => {
  useEffect(() => {
    console.log(props);
  }, [props]);
  return (
    <div className="home-container">
      <span>home page</span>
      <Link to="/test">test</Link>
      <div>
        <button onClick={() => props.UserTest()}>test action</button>
      </div>
    </div>
  );
};

export default connect(
  ({ user }) => ({
    user
  }),
  {
    UserTest
  }
)(Index);
