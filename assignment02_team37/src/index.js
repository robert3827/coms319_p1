import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Catalog from './components/Catalog';
import reportWebVitals from './reportWebVitals';
import Shop from './components/Shop';
import {App} from './components/App'

import List from './components/learningUseState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Shop />
    {/* <List /> */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
