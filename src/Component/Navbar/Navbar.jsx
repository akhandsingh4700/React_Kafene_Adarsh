import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';
import { setLogin } from '../../Redux/action/loginaction';


const Navbar = () => {
  let dispatch = useDispatch()

  const state = useSelector(state => state)

  const logout=()=>{
    dispatch(setLogin(false))
    window.localStorage.setItem('loggedin',"0")
    console.log(Boolean( window.localStorage.getItem('loggedin')))

  }
  
  return (
    <div className="navbar">
        <div className="navbar-left-menu">
            <div className="navbar-logo">
                <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo" />
                <p className="navbar-text">Kafene</p>
            </div>
            <nav>
                <Link className="navbar-menu-items" to='/order'>Orders</Link>
                <Link className="navbar-menu-items" to='/products'>Products</Link>
                <Link className="navbar-menu-items" to='/user'>Users</Link>
            </nav>
        </div>
        <Link class="navbar-menu-items" id="logout-btn" to="/" onClick={logout}>Logout</Link>

    </div>
  )
}

export default Navbar