import React from "react";
import { hot } from "react-hot-loader/root";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navigation from "./components/navigation/NavigationWrapper";
import GenericRoute from "./routes/GenericRoute";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

const ContentWrapper = styled.main`
  margin: var(--nav-height) 0 0
    ${(props: { sideNavWidth: number }) => props.sideNavWidth}px;
  height: 100%;
  @media (max-width: 1100px) {
    margin-left: 0;
  }
`;

const App = () => {
  return (
    <div id="App">
      <BrowserRouter>
        <Navigation />
        <ContentWrapper {...{ sideNavWidth: 200 }}>
          <Route
            path="/"
            exact={true}
            render={() => <GenericRoute name="Homettttttt" />}
          />
          <Route path="/login" render={() => <GenericRoute name="Login" />} />
          <Route
            path="/register"
            render={() => <GenericRoute name="Register" />}
          />
        </ContentWrapper>
      </BrowserRouter>
    </div>
  );
};

/* 
  Loading Animation
  
  <div id="loading">
  <div className="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  </div>; */

export default hot(App);
