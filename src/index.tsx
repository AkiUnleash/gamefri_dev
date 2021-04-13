// React
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import Main from './Main'
// state
import { Provider } from "react-redux"
import { store } from './common/state/store'


render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider >
  </React.StrictMode>,
  document.getElementById('root'));