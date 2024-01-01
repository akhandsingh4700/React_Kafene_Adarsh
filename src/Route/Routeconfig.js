import { createBrowserRouter, Navigate,redirect } from 'react-router-dom'
import Login from '../pages/LoginPage/Login'
import Order from '../pages/Order/Order'
import Products from '../pages/Products/Products'
import User from "../pages/Users/User"


let lStatus = parseInt( window.localStorage.getItem("loggedin") )

console.log(lStatus)


export const ROUTES = createBrowserRouter([
    {
      path: '/',
      element:<Login/>,

      loader:()=>{
        if(parseInt( window.localStorage.getItem("loggedin") )){
            return redirect('/Order')
        }
        return null
        // else if(!(parseInt( window.localStorage.getItem("loggedin") ))){
        //     return redirect('/')
        // }
         
        
      }

    },
    {
      path: '/Order',
      element: <Order/>,
      loader:()=>{
        if(!(parseInt( window.localStorage.getItem("loggedin") ))
        ){
            return redirect('/')
        }
        return null
    }

    },
    {
      path: '/Products',
      element: <Products/>,
      loader:()=>{
        if(!(parseInt( window.localStorage.getItem("loggedin") ))
        ){
            return redirect('/')
        }
        return null
    }
    },
    {
      path: '/User',
      element: <User/>,
      loader:()=>{
        if(!(parseInt( window.localStorage.getItem("loggedin") ))
        ){
            return redirect('/')
        }
        return null
    }
    }
  ])