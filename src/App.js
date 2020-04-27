import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import SignInPage from "./Components/AuthenticationPages/SignInPage";
import SignUpPage from "./Components/AuthenticationPages/SignUpPage";
import "typeface-roboto";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignInPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={SignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
