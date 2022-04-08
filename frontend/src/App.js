import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import TestPage from "./components/TestPage";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      {/* <Header /> */}
      <Main>
        <Switch>
          <Route exact path="/msg">
            <TestPage />
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
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);
`;

export default App;
