import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import TestPage from "./components/TestPage";
import GlobalStyles from "./GlobalStyles";
import SignIn from "./components/SigninPage";
import SignUp from "./components/SignUpPage";
import HelpTaskListing from "./components/HelpTaskListing";
import Header from "./components/Header";
import CamperPrivatePage from "./components/CamperPrivatePage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/msg">
            <TestPage />
          </Route>
          <Route exact path="/signin">
            <h1>Sign In</h1>
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <h1>Sign Up</h1>
            <SignUp />
          </Route>
          <Route exact path="/helpcenter">
            This is the helpcenter page
            <HelpTaskListing />
          </Route>
          <Route exact path="/camper/:camperId">
            <CamperPrivatePage />
          </Route>
          <Route exact path="/">
            This is the home page
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
      </Main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: var(--c-navy);
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 90vh;
`;

export default App;
