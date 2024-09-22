import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Toaster } from './components/ui/sonner.jsx';
import React from "react"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      
    </Provider>
    <Toaster />
  </React.StrictMode>,
  document.getElementById('root')
);
