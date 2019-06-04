import React from "react";
import "./Button.style.css";

export class Button extends React.Component {
  render() {
    const { onClick, text } = this.props;
    return (
      <button className="button" onClick={onClick}>
        <p>{text}</p>
      </button>
    );
  }
}
