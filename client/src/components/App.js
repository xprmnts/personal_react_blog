import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RequireAuth from "./auth/require_auth";

import Header from "./header/Header";
import Signin from "./auth/Signin";
import Signout from "./auth/Signout";
import Register from "./auth/Register";
import Dashboard from "./cms/Dashboard";
// <Route exact path="/" component={Landing} />
// <Route path="/signin" component={Signin} />
// <Route exact path="/cms" component={Cms} />
// <Route path="/cms/new" component={NewPost} />

const Landing = () => <h2>Front Page</h2>;
// const Signout = () => <h2>Sign Out</h2>;
// const Register = () => <h2>Register</h2>;
// const Cms = () => <h2>CMS</h2>;
// const NewPost = () => <h2>NewPost</h2>;

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/cms" component={RequireAuth(Dashboard)} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
