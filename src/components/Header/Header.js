import React from "react";
import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import "./Header.style.css";

export class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="right">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>
    );
  }
}
