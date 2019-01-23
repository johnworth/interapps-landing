import React, { Component } from "react";
import ErrorSnackbar from "../src/components/ErrorSnackbar";
import { storiesOf } from "@storybook/react";

import { newStore } from "../src/store/configure";
import { setHttpCode } from "../src/actions";


storiesOf("error/ErrorSnackbarTest", module)
  .add("with 500 error", () => {
    const store = newStore();
    store.dispatch(setHttpCode(500));
    return (
        <ErrorSnackbar store={store}/>
    );
  })
  .add("with 403 error", () => {
    const store = newStore();
    store.dispatch(setHttpCode(403));
    return (
        <ErrorSnackbar store={store}/>
    );
  })
  .add("with 507 error", () => {
    const store = newStore();
    store.dispatch(setHttpCode(507));
    return (
        <ErrorSnackbar store={store}/>
    );
  });
