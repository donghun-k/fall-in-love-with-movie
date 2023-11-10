import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './configs/router.tsx';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
