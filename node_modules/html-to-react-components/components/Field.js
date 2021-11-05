import React from "react";
import Label from "./Label";
import Input from "./Input";

class Field extends React.Component {
  render() {
    return (
      <div className="field">
        <Label />
        <Input />
      </div>
    );
  }
}

export default Field;
