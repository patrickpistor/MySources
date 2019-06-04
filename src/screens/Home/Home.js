// Logic for handing whether the user is logged in or not
import React, { Component } from "react";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase, isEmpty } from "react-redux-firebase";

import { Button } from "../../components/Button/Button";
import "../../styles.css";

class Home extends Component {
  static propTypes = {
    authExists: PropTypes.bool
  };

  componentDidMount() {
    if (isEmpty(this.props.auth)) {
      this.props.history.push("/login");
    }
  }

  onLogout = () => {
    this.props.firebase.logout();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="App">
        <Button onClick={() => console.log(this.props)} text="User" />
        <Button onClick={() => this.onLogout()} text="Logout" />
      </div>
    );
  }
}

export default compose(
  withFirebase, // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(Home);
