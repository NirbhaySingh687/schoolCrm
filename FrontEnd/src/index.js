import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from "react-redux"
import store from "./store"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(
    <MuiThemeProvider><Provider store={store}><App /></Provider></MuiThemeProvider>,
  document.getElementById('root')
);
