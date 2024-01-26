import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TanstackQueryContextProvider from './contexts/TanstackQueryContext';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <TanstackQueryContextProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </TanstackQueryContextProvider>
    </Provider>
  </StrictMode>
);
