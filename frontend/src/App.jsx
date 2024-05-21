import React from 'react';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';

//Pantalla Bienvenida
import WelcomeScreen from './pages/Public/WelcomeScreen'; 

//Gestión de Usuarios
import SignInScreen from './pages/GestionUsuarios/Public/SignInScreen';
import SignUpScreen from './pages/GestionUsuarios/Public/SignUpScreen';
import AdminUsersScreen from './pages/GestionUsuarios/Admin/AdminUsersScreen'; 
import UsersScreen from './pages/GestionUsuarios/User/UsersScreen';
import EditUserScreen from './pages/GestionUsuarios/User/EditUserScreen';
import ChangeEmail from './pages/GestionUsuarios/User/ChangeEmail';
import ChangePassword from './pages/GestionUsuarios/User/ChangePassword';
import Unauthorized from './pages/GestionUsuarios/Public/Unauthorized';
//import DisabledScreen from './pages/GestionUsuarios/User/DisabledScreen.js';

//Home (Autenticacion)
import UserHomeScreen from './pages/Home/UserHomeScreen';

//Gestión de Libros
import UserBooksScreen from './pages/GestionLibros/User/UserBooksScreen';
import AddBookScreen from './pages/GestionLibros/User/AddBookScreen.js';
import EditBookScreen from './pages/GestionLibros/User/EditBookScreen.js';
import AdminBooksScreen from './pages/GestionLibros/Admin/AdminBooksScreen';

//Gestión de Inventario y Compras
import AdminInventoryScreen from './pages/GestionCompras/Admin/AdminInventoryScreen';

import UserInventoryScreen from './pages/GestionCompras/User/UserInventoryScreen';
import UserShoppingCartScreen from './pages/GestionCompras/User/UserShoppingCartScreen'; 
import UserCheckoutScreen from './pages/GestionCompras/User/UserCheckoutScreen';  

import { UserProtected } from './pages/GestionUsuarios/User/UserProtected';
import { AuthProvider } from './context/AuthContext';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomeScreen />
    },
    // Página Home Validación de Usuario
    {
      path: "/home",
      element: <UserProtected><UserHomeScreen /></UserProtected>
    },
    // Gestión de Usuarios
    // Público
    {
      path: "/signin",
      element: <SignInScreen />
    },
    {
      path: "/signup",
      element: <SignUpScreen />
    },
    /*{
      path: "/usuario-inhabilitado",
      element: <UserProtected requiredRole="inhabilitado"><DisabledScreen /></UserProtected>
    },*/
    // Admin
    {
      path: "/admin-users",
      element: <UserProtected requiredRole="admin"><AdminUsersScreen /></UserProtected>
    },
    // User
    {
      path: "/users",
      element: <UserProtected><UsersScreen /></UserProtected>
    },
    {
      path: "/users/:userId/edit",
      element: <UserProtected><EditUserScreen /></UserProtected>
    },
    {
      path: "/users/:userId/edit/email",
      element: <UserProtected><ChangeEmail /></UserProtected>
    },
    {
      path: "/users/:userId/edit/password",
      element: <UserProtected><ChangePassword /></UserProtected>
    },
    // Gestión de Libros
    // Admin
    {
      path: "/admin-books",
      element: <UserProtected requiredRole="admin"><AdminBooksScreen /></UserProtected>
    },
    // User
    {
      path: "/books",
      element: <UserProtected><UserBooksScreen/></UserProtected>
    },
    {
      path: "/books/add",
      element: <UserProtected requiredRole="admin"><AddBookScreen/></UserProtected>
    },
    {
      path: "/books/:bookId/edit",
      element: <UserProtected requiredRole="admin"><EditBookScreen/></UserProtected>
    },
    // Gestión de Inventario y Compras AddBookScreen.js
    // Admin
    {
      path: "/admin-inventory",
      element: <UserProtected requiredRole="admin"><AdminInventoryScreen /></UserProtected>
    },
    // User
    {
      path: "/inventory",
      element: <UserProtected><UserInventoryScreen /></UserProtected>
    },
    {
      path: "/cart",
      element: <UserProtected><UserShoppingCartScreen /></UserProtected>
    },
    {
      path: "/checkout",
      element: <UserProtected><UserCheckoutScreen /></UserProtected>
    },
    // Página de acceso no autorizado
    {
      path: "/unauthorized",
      element: <Unauthorized />
    }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;