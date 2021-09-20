import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './App';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import d from "./json/theme.json"

export const theme = createTheme(d);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider  theme={theme}>
      <Router/>
    </ThemeProvider >
  </React.StrictMode>,
  document.getElementById('root')
);


