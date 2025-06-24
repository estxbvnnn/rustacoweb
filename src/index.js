import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles.css'; // Assuming you will have a styles.css for global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);