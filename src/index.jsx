import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import store from './store';
import Root from "./components/Root.jsx";

const root = document.getElementById('root');
ReactDom.render(
    <Provider store={store}>
            <Root />
    </Provider>, root);