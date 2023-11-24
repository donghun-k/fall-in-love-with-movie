import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import RouterContextProvider from './contexts/RouterContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterContextProvider />
  </StrictMode>
);
