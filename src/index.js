import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase, { auth } from "./firebase.js";

import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: "",
      user: null
    };
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  };

  handleSubmit = async () => {
    const itemsRef = firebase
      .database()
      .ref("Stories/aHR0cHM6Ly93d3cubm90aW9uLnNvLw==");

    const userRef = firebase
      .database()
      .ref("Stories/aHR0cHM6Ly93d3cubm90aW9uLnNvLw==/userIDs");
    console.log(itemsRef);
    var newPostRef = await itemsRef
      .push({ userIDs: [...userRef, "Unregistered 2"] })
      .catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
    console.log(itemsRef);
  };

  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  };

  register = () => {
    auth
      .createUserWithEmailAndPassword("test@test.com", "testing")
      .then(async result => {
        const userID = result.user.uid;
        const itemsRef = firebase.database().ref("Users");
        const item = {
          affiliation: "Strong Left",
          stories: []
        };
        console.log(userID);
        itemsRef.child(userID).set(item);
        auth
          .signInWithEmailAndPassword("test@test.com", "testing")
          .then(result => {
            const user = result.user;
            this.setState({
              user
            });
          })
          .catch(function(error) {
            var errorMessage = error.message;
            console.log(errorMessage);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  login = () => {
    auth
      .signInWithEmailAndPassword("test@test.com", "testing")
      .then(result => {
        const user = result.user;
        this.setState({
          user
        });
      })
      .catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  render() {
    return (
      <div className="App">
        <p>{this.state.currentItem}</p>
        <button onClick={this.handleSubmit}>Add Item</button>
        {this.state.user ? (
          <button onClick={this.logout}>Log Out</button>
        ) : (
          <button onClick={this.login}>Log In</button>
        )}
        <button onClick={() => console.log(this.state.user)}>Print User</button>
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
