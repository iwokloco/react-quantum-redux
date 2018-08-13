import React, { Component } from 'react';
import axios from 'axios'
import '../css/App.css';
import { Actions } from '../actions/Actions'
import { qs } from '../quantum/quantum';

export default class App extends Component {

  constructor() {
    super();
    this.state = {message: null, isCallingBackend: false};
    qs.connect("app", this, (state) => {
      return { message: state.message, isCallingBackend: state.isCallingBackend };
    });    
  }

  componentDidMount() {
    this.getMessageFromBackend()
  }

  getMessageFromBackend() {
    Actions.startLoadingMessageFromBackend()
    axios.get('/hello')
      .then((resp) => {
        Actions.setMessageFromBackend(resp.data.message)
      })
      .catch(function (error) {
        console.log(error)
        Actions.stopLoadingMessageFromBackend()
      });
  }

  render() {
    let message = this.state.message;
    return (
      <div className="app-container">
        <h1 className="app-title">react-redux-express-starter</h1>
        {
          !this.state.isCallingBackend && !!message && ("The backend was successfully called. Its message is: " + message)
        }
        {
          !this.state.isCallingBackend && !message && "The message could not be retrieved from backend :/"
        }
        {
          this.state.isCallingBackend && "Retrieving the message..."
        }
      </div>
    );
  }
}
