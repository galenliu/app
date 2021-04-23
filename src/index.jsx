import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './App';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import d from "./json/theme.json"

export const theme = createMuiTheme(d);

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <Router/>
        </MuiThemeProvider>
    </React.StrictMode>,

    document.getElementById('root')
);


