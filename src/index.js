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

  handleSubmit = async e => {
    e.preventDefault();
    const itemsRef = firebase.database().ref("Stories");
    const item = {
      affiliation: "Strong Left",
      author: "Bruce Wayne",
      sourceTitle: "Title",
      synopsis: "Synopsis",
      image: "Image",
      sourceUrl: "Url",
      headline: "Headline"
    };
    var newPostRef = await itemsRef.push(item);
    this.setState({
      currentItem: newPostRef.key
    });
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
      .createUserWithEmailAndPassword("test2@test.com", "testing")
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
          .signInWithEmailAndPassword("test2@test.com", "testing")
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
      .signInWithEmailAndPassword("batman@batman.com", "batman")
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
        <form onSubmit={this.handleSubmit}>
          <p>{this.state.currentItem}</p>
          <button>Add Item</button>
          {this.state.user ? (
            <button onClick={this.logout}>Log Out</button>
          ) : (
            <button onClick={this.login}>Log In</button>
          )}
          <button onClick={() => console.log(this.state.user)}>
            Print User
          </button>
          <button onClick={this.register}>Register</button>
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
