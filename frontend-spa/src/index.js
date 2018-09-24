import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { qs } from 'quantum-store';
import { translate as en } from "./strings/en.js"

qs.init({ 
  app: { 
    message: null,
    isCallingBackend: true
   },
   strings: {
      locale: 'en',
      strings: en
   }
});

ReactDOM.render(
  <div>
    <App/>
  </div>,
  document.getElementById('root'))

registerServiceWorker();
