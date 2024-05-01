import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import TaskLandingPage from '../components/Tasks'
import Equipment from '../components/Inventory';
import Shop from '../components/Shop';
import Settings from '../components/Settings/Settings';
import About from '../components/About/About';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TaskLandingPage />
      },
      {
        path: 'signup',
        element: <SignupFormPage />
      },
      {
        path: 'equipment',
        element: <Equipment />
      },
      {
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },
  {
    path: 'login',
    element: <LoginFormPage />
  }
]);
