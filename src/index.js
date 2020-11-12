import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'antd/dist/antd.css';
import App from './App';
import './i18n';

ReactDOM.render(
    <App/>,
  document.getElementById('root')
);


