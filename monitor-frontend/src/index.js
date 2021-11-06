import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './modules/app'
import 'normalize.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const style = {
  primary:"#53c5bf",
  p_light:"#ebfbfa",
  p_dark:"#34898d",
  p_text:"#ebfbfa",
  secondary:""
}

ReactDOM.render(<Router>
    <ThemeProvider theme={style}>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
