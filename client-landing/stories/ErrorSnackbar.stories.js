import React, { Component } from "react";
import ErrorSnackbar from "../src/components/ErrorSnackbar";

import { newStore } from "../src/store/configure";
import { setHttpCode } from "../src/actions";


class ErrorSnackbarTest extends Component {
    render() {
      const store = newStore();
      store.dispatch(setHttpCode(500));
      return (
          <ErrorSnackbar store={store}/>
      );
    }
}

export default ErrorSnackbarTest;
