import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from 'styles/GlobalStyle';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "remixicon/fonts/remixicon.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

reportWebVitals();
