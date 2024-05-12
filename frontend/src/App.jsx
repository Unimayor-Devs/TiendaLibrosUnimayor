import React from 'react';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomeScreen from './pages/Public/WelcomeScreen'; 
import SignInScreen from './pages/GestionUsuarios/Public/SignInScreen';
import SignUpScreen from './pages/GestionUsuarios/Public/SignUpScreen';
import UsersScreen from './pages/GestionUsuarios/Admin/AdminUsersScreen'; 
import BooksScreen from './pages/GestionLibros/User/UserBooksScreen';  
import InventoryScreen from './pages/GestionCompras/Admin/AdminInventoryScreen';  
import ShoppingCartScreen from './pages/GestionCompras/User/UserShoppingCartScreen'; 
import CheckoutScreen from './pages/GestionCompras/User/UserCheckoutScreen';  
import UserHomeScreen from './pages/Home/UserHomeScreen'; 
import { UserProtected } from './pages/GestionUsuarios/User/UserProtected';
import { AuthContext } from './context/AuthContext';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomeScreen></WelcomeScreen>
    },
    {
      path: "/sigin",
      element: <SignInScreen></SignInScreen>
    },
    {
      path: "/SignUp",
      element: <SignUpScreen></SignUpScreen>
    },
    {
      path: "/home",
      element: <UserProtected><UserHomeScreen/></UserProtected>
    },
    {
      path: "/users",
      element: <UsersScreen></UsersScreen>
    },
    {
      path: "/books",
      element: <BooksScreen></BooksScreen>
    },
    {
      path: "/inventory",
      element: <InventoryScreen></InventoryScreen>
    },
    {
      path: "/cart",
      element: <ShoppingCartScreen></ShoppingCartScreen>
    },
    {
      path: "/checkout",
      element: <CheckoutScreen></CheckoutScreen>
    }
  ])

  return(
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
