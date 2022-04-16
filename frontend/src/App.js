import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import SignIn from "./components/SigninPage";
import SignUp from "./components/SignUpPage";
import HelpTaskListing from "./components/HelpTaskListing";
import Header from "./components/Header";
import CamperPrivatePage from "./components/CamperPrivatePage";
import Home from "./components/Home";
import VoiceMsgsListing from "./components/VoiceMsgsListing";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/signin">
            <h1>Sign In</h1>
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <h1>Sign Up</h1>
            <SignUp />
          </Route>
          <Route exact path="/helpcenter">
            <HelpTaskListing />
          </Route>
          <Route exact path="/msgcenter">
            <VoiceMsgsListing />
          </Route>
          <Route exact path="/camper/:camperId">
            <CamperPrivatePage />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
      </Main>
      <Footer />
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: var(--c-light-background);
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: calc(100vh-420px);
  width: 100%;
  overflow: hidden;
`;

export default App;
