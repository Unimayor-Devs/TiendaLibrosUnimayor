import React from 'react';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';

//Pantalla Bienvenida
import WelcomeScreen from './pages/Public/WelcomeScreen'; 

//Gestión de Usuarios
import SignInScreen from './pages/GestionUsuarios/Public/SignInScreen';
import SignUpScreen from './pages/GestionUsuarios/Public/SignUpScreen';
import AdminUsersScreen from './pages/GestionUsuarios/Admin/AdminUsersScreen'; 
import UsersScreen from './pages/GestionUsuarios/User/UsersScreen';

//Home (Autenticacion)
import UserHomeScreen from './pages/Home/UserHomeScreen';

//Gestión de Libros
import UserBooksScreen from './pages/GestionLibros/User/UserBooksScreen';
import AdminBooksScreen from './pages/GestionLibros/Admin/AdminBooksScreen';

//Gestión de Inventario y Compras
import AdminInventoryScreen from './pages/GestionCompras/Admin/AdminInventoryScreen';

import UserInventoryScreen from './pages/GestionCompras/User/UserInventoryScreen';
import UserShoppingCartScreen from './pages/GestionCompras/User/UserShoppingCartScreen'; 
import UserCheckoutScreen from './pages/GestionCompras/User/UserCheckoutScreen';  


import { UserProtected } from './pages/GestionUsuarios/User/UserProtected';
import { AuthContext } from './context/AuthContext';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomeScreen></WelcomeScreen>
    },
    //Pagina Home Validación de Usuario
    {
      path: "/home",
      element: <UserProtected><UserHomeScreen/></UserProtected>
    },
    //Gestión de Usuarios
      //Publico
    {
      path: "/sigin",
      element: <SignInScreen></SignInScreen>
    },
    {
      path: "/SignUp",
      element: <SignUpScreen></SignUpScreen>
    },
      //Admin    
    {
      path: "/admin-users",
      element: <AdminUsersScreen></AdminUsersScreen>
    },
      //User
    {
      path: "/users",
      element: <UsersScreen></UsersScreen>
    },
    //Gestión de Usuarios
      //Admin
    {
      path: "/admin-books",
      element: <AdminBooksScreen></AdminBooksScreen>
    },
      //User
    {
      path: "/books",
      element: <UserBooksScreen></UserBooksScreen>
    },
    //Gestión de Inventario y Compras
      //Admin
    {
      path: "/admin-inventory",
      element: <AdminInventoryScreen></AdminInventoryScreen>
    },
      //User
    {
      path: "/inventory",
      element: <UserInventoryScreen></UserInventoryScreen>
    },
    {
      path: "/cart",
      element: <UserShoppingCartScreen></UserShoppingCartScreen>
    },
    {
      path: "/checkout",
      element: <UserCheckoutScreen></UserCheckoutScreen>
    }
  ])

  return(
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
