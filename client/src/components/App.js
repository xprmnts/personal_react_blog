import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RequireAuth from "./auth/require_auth";

import Header from "./header/Header";
import Signin from "./auth/Signin";
import Signout from "./auth/Signout";
import Register from "./auth/Register";
import Dashboard from "./dash/Dashboard";
import Composer from "./editor/Composer";
const Landing = () => <h2>Front Page</h2>;

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dash" component={RequireAuth(Dashboard)} />
            <Route
              exact
              path="/compose/:id"
              component={RequireAuth(Composer)}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
