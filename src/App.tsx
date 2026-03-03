

import {createBrowserRouter} from 'react-router-dom';

import { Home } from './pags/home';
import { Admin } from './pags/admin';
import { Login } from './pags/login';
import { RedesSociais } from './pags/redesSociais';
import {ErrorPage} from './pags/error'

import {Private} from './routes/Private'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  }, 
  {
    path: '/login', 
    element: <Login/>
  },
  {
    path: '/admin',
    element: <Private><Admin/></Private> // passa primeiro pelo private, se ele deixar passa para admin 
  }, 
  {
    path: '/admin/social', 
    element: <Private><RedesSociais/></Private>
  },
  {
    path: '*', 
    element: <ErrorPage/>
  }
])

export {router}; 