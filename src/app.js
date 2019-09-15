import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter, Route, browserHistory, Switch } from "react-router-dom";
import Header from "./components/header";
import Home from "./routers/home";
import Login from "./routers/login";
import NotFound from "./routers/404";
import NewArticle from "./routers/newArticle";
import Article from "./routers/article";

import "./styles/index.less";
import "antd/dist/antd.less";

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/new" component={NewArticle} />
        <Route exact path="/article/:id" component={Article} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default hot(App);
