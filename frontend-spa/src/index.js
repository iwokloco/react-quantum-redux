import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { qs } from './quantum/quantum';

qs.init({ 
  app: { 
    message: null,
    isCallingBackend: true
   }
});

ReactDOM.render(
  <div>
    <App/>
  </div>,
  document.getElementById('root'))

registerServiceWorker();
