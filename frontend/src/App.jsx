import React from 'react';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomeScreen from './pages/Publico/WelcomeScreen'; 
import SignInScreen from './pages/Publico/SignInScreen';
import SignUpScreen from './pages/Publico/SignUpScreen'; 
import UsersScreen from './pages/Administrador/AdminUsersScreen'; 
import BooksScreen from './pages/Usuario/UserBooksScreen';  
import InventoryScreen from './pages/Administrador/AdminInventoryScreen';  
import ShoppingCartScreen from './pages/Usuario/UserShoppingCartScreen'; 
import CheckoutScreen from './pages/Usuario/UserCheckoutScreen';  
import HomeScreen from './pages/Usuario/UserHomeScreen'; 
import { UserProtected } from './pages/Usuario/UserProtected';
import { AuthContext } from './context/AuthContex';


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
      element: <UserProtected><HomeScreen/></UserProtected>
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
