import React from "react";
import ListItem from "./ListItem";

class Nav extends React.Component {
  render() {
    return (
      <nav className="nav">
        <ul className="list">
          <ListItem />
          <ListItem />
        </ul>
      </nav>
    );
  }
}

export default Nav;
