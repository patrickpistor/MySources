import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withFirebase } from "react-redux-firebase";

import { Button } from "../../components/Button/Button";
import { TextBox } from "../../components/TextBox/TextBox";
import { H1 } from "../../components/Text/H1";
import { Hyperlink } from "../../components/Hyperlink/Hyperlink";
import "../styles.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };

  onLogin = () => {
    this.props.firebase
      .login({
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch(e => {
        console.log(e.message);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="width">
          <H1 text="Login" />
          <div className="container">
            <TextBox
              label="Email"
              name="email"
              value={email}
              type="email"
              onChange={e => this.handleChange(e)}
            />
            <br />
            <TextBox
              label="Password"
              name="password"
              value={password}
              type="password"
              onChange={e => this.handleChange(e)}
            />
            <br />
          </div>
          <div className="container">
            <Button onClick={() => this.onLogin()} text="LOGIN" />
            <br />
            <Button
              onClick={() => this.props.firebase.logout()}
              text="LOGOUT"
            />
            <br />
            <Hyperlink link="/register" text="REGISTER" external={false} />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object,
  profile: PropTypes.object
};

export default compose(
  withFirebase, // withFirebase can also be used
  connect(({ firebase: { auth, profile } }) => ({ auth, profile }))
)(Login);
