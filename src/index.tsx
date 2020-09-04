import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { reducers } from "./reducers";
import { BrowserRouter } from "react-router-dom";

const logger = createLogger({
  level: "info",
  collapsed: true,
  diff: true
});

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const middleware = composeEnhancers(applyMiddleware(
  thunkMiddleware,
  logger
));

const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/filmku">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
