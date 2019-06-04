import React from "react";
import "./Text.style.css";

export class H1 extends React.Component {
  render() {
    const { text } = this.props;
    return <h1>{text}</h1>;
  }
}
