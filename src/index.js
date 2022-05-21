import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import * as _redux from "./redux";
import store, { persistor } from "./redux/store";
import reportWebVitals from "./utils/reportWebVitals";
//  import 'bootstrap/dist/css/bootstrap.min.css';
//  import 'bootstrap-social/bootstrap-social.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./_theme/css/bootstrap.min.css";
import "./_theme/fonts/icomoon/style.css";
import App from "./app/App";
import "./index.css";
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const { PUBLIC_URL } = process.env;

_redux.setupAxios(axios, store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} persistor={persistor} basename={PUBLIC_URL} />
  </React.StrictMode>
);

reportWebVitals();
