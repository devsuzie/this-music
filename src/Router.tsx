/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Route, Switch } from "react-router-dom";
import styled from "@emotion/styled";

import { useLoadingStore, useModalStore } from "./store";
import routes from "./routes";

const LoadingBackdrop = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
`;

const Page = styled(Container)`
  padding-top: ${({ theme }) => (theme as any).constants.NAV_HEIGHT};
`;

export default () => {
  const { state: loadingState } = useLoadingStore();
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

      {loadingState.loading && (
        <LoadingBackdrop>
          <Spinner animation="grow" />
        </LoadingBackdrop>
      )}
    </>
  );
};
