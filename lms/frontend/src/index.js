import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'mobx-react';

import Toast from "GUI/Elements/Toast"

import ToastStore from "MODELS/Stores/ToastStore"
import AuthStore from "MODELS/Stores/AuthStore"
import {config} from "MODELS/Stores/ConfigStore"

console.log('Stating...');
console.log('Loading Config');
config.load().then( () => {
    console.log('Done');
    const root = ReactDOM.createRoot(document.getElementById('root'));
    const mobxStores = {
        ToastStore,
        AuthStore
    };
    // console.log(mobxStores);
    root.render(
      <Provider { ...mobxStores }>
          <Toast/>
          <Router>
              <App />
          </Router>
      </Provider>
    );
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
