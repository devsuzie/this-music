/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import styled from "@emotion/styled";

import { useModalStore } from "./store";
import routes from "./routes";

const Page = styled(Container)``;

export default () => {
  const {
    state: { modals },
  } = useModalStore();

  return (
    <>
      <Switch>
        {routes.map((route, index) => (
          <Route exact={route.exact} key={index} path={route.path}>
            {route.private && (
              <Page fluid={route.fluid}>
                <route.component />
              </Page>
            )}
          </Route>
        ))}
      </Switch>

      {modals.map((modal) => modal)}
    </>
  );
};
