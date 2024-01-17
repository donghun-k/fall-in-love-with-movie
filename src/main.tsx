import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import RouterContextProvider from './contexts/RouterContext';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterContextProvider />
    </Provider>
  </StrictMode>
);
