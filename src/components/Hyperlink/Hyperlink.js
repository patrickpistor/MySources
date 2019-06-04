import React from "react";
import { Link } from "react-router-dom";
import "./Link.style.css";

export class Hyperlink extends React.Component {
  render() {
    const { link, text, external } = this.props;
    if (external) {
      return (
        <a href={link} className="link">
          {text}
        </a>
      );
    }
    return (
      <Link to={link} className="link">
        {text}
      </Link>
    );
  }
}
