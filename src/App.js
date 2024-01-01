import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RouterProvider } from 'react-router';
import Login from "./pages/LoginPage/Login";
import Order from "./pages/Order/Order";
import Products from "./pages/Products/Products";
import { User } from "./pages/Users/User";
import {ROUTES} from "./Route/Routeconfig"


function App() {

  return (
    <RouterProvider  router={ROUTES} />
    
    // <Router>
    //     <Routes>   
    //       <Route path="/" element={<Login />} />
    //       <Route path="/order" element={<Order />} />
    //       <Route path="/products" element={<Products />} />
    //       <Route path="/user" element={<User />} />
    //     </Routes>
    // </Router>
  );
}


export default App;
