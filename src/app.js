import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter, Route, browserHistory, Switch } from "react-router-dom";
import Home from "./routers/home";
import NotFound from "./routers/404";

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default hot(App);
