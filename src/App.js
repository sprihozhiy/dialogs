import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import SignInPage from "./Components/AuthenticationPages/SignInPage";
import SignUpPage from "./Components/AuthenticationPages/SignUpPage";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import "typeface-roboto";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <div className="App">
          <Route exact path="/" component={SignInPage} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signup" component={SignUpPage} />
        </div>
      </Switch>
    </AuthProvider>
  );
}

export default App;
