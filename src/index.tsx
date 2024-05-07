import reportWebVitals from './reportWebVitals';
import './index.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import App from './App';
import history from './utilities/history';
import configureStore from './store/configureStore'
import {
  HashRouter,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import React from 'react';

const initialState = {}
const store = configureStore(initialState, history)
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <HashRouter>
          <App />
        </HashRouter>
    </ConnectedRouter>
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
