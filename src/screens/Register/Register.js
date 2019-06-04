import React, { Component } from "react";
import { compose } from "redux";
//import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withFirebase } from "react-redux-firebase";

import { Button } from "../../components/Button/Button";
import { TextBox } from "../../components/TextBox/TextBox";
import { H1 } from "../../components/Text/H1";
import { Hyperlink } from "../../components/Hyperlink/Hyperlink";
import "../styles.css";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };

  render() {
    const { email, password, fullname } = this.state;
    const { firebase } = this.props;
    return (
      <div className="container">
        <div className="width">
          <H1 text="Register" />
          <div className="container">
            <TextBox
              label="Full Name"
              name="fullname"
              value={fullname}
              type="name"
              onChange={e => this.handleChange(e)}
            />
            <br />
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
            <Button
              onClick={() =>
                firebase.login({
                  email: this.state.email,
                  password: this.state.password
                })
              }
              text="REGISTER"
            />
            <br />
            <Hyperlink link="/login" text="LOGIN" external={false} />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object,
  profile: PropTypes.object
};

export default compose(
  withFirebase // withFirebase can also be used
  //connect(({ firebase: { auth, profile } }) => ({ auth, profile }))
)(Register);
