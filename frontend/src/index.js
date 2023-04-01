import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalState } from './state/provider';
import reducer, { initilastate } from './state/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalState initilastate={initilastate} reducer={reducer}>
    <App />
  </GlobalState>

);
