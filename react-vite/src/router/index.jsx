import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Equipment from '../components/Inventory';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>TaskPage</h1>,
      },
      {
        path: 'signup',
        element: <SignupFormPage />,
      },
      {
        path: 'equipment',
        element: <Equipment />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginFormPage />,
  },
]);
