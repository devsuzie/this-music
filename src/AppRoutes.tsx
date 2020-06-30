import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
