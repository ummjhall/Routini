import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import TaskLandingPage from '../components/Tasks'
import Equipment from '../components/Inventory';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TaskLandingPage />,
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
