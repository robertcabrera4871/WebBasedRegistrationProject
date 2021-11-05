import React from "react";
import Heading from "./Heading";
import Nav from "./Nav";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Heading />
        <Nav />
      </header>
    );
  }
}

export default Header;
