import React, { Component } from "react";

import { NavLink } from "react-router-dom";

export default class NavList extends Component {
  render() {
    return (
      <li className="nav-item">
        <NavLink {...this.props} className="nav-link" />
      </li>
    );
  }
}
