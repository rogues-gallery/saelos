require("./bootstrap");

import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider, translate } from "react-i18next";
import i18next from "./i18n";
import store from "./store";
import Routes from "./routes";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

const Saelos = translate()(App);

render(
  <I18nextProvider i18n={i18next}>
    <Saelos />
  </I18nextProvider>,
  document.getElementById("root")
);
