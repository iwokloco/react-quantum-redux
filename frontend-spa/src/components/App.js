import React, { Component } from 'react';
import axios from 'axios'
import '../css/App.css';
import { Actions } from '../actions/Actions'
import { qs } from 'quantum-store';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      message: null, 
      isCallingBackend: false,
      strings: qs.get("strings").strings
    };
    qs.connect("app", this, (state) => {
      return { message: state.message, isCallingBackend: state.isCallingBackend };
    });  
    qs.connect("strings", this, (state) => {
      return { strings: state.strings };
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

  changeLanguage() {
    Actions.setLanguage( (qs.get("strings").locale === 'en') ? 'es' : 'en');
  }

  render() {
    let message = this.state.message;
    return (
      <div className="app-container">
        <h1 className="app-title">{ this.state.strings.title }</h1>
        {
          !this.state.isCallingBackend && !!message && (this.state.strings.success + message)
        }
        {
          !this.state.isCallingBackend && !message && this.state.strings.error
        }
        {
          this.state.isCallingBackend && this.state.strings.loading
        }
        <div className="button" onClick={this.changeLanguage}>{this.state.strings.changeLang} { qs.get("strings").locale}</div>
      </div>
    );
  }
}
