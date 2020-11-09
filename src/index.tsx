import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
// import store from './redux_v1'
import store from './redux_sdk'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("root")
);
