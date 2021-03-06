import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CookiesProvider>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme} >
        <BrowserRouter basename='blog'>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  </CookiesProvider> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// import { serviceWorker } from './mockserver/server';
// if (process.env.NODE_ENV === 'development') {
//   serviceWorker.start({}).then(res => console.log(res)).catch(err => console.log(err));
// }
// reportWebVitals();

