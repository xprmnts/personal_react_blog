import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import NavList from "./NavList";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // for the authenticated visitor
      return (
        <ul className="navbar-nav">
          <NavList to="/signout">Signout</NavList>
        </ul>
      );
    } else {
      // for the unauthenticated vistor
      return (
        <ul className="navbar-nav">
          <NavList to="/abc">L1</NavList>
          <NavList to="/efg">L2</NavList>
          <NavList to="/hij">L3</NavList>
          <NavList to="/klm">L4</NavList>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-white mb-3">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            XPRMNTS
          </NavLink>
          {this.renderLinks()}
        </div>
      </nav>
    );
  }
}

// auth state property to handle nav elements
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
