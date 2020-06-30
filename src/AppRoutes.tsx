import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Main from "./pages/index";
import AddMusic from "./pages/AddMusic";

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/add-music" component={AddMusic} />
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
