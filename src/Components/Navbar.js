import React from 'react'
import {Link} from "react-router-dom";
import Home from "../Pages/Home.js"
import Auth from "../Pages/Auth.js"
import Createrecipe from "../Pages/Create-recipe.js"
import Savedrecipe from "../Pages/Saved-recipe.js";
import {useCookies} from "react-cookie"
import { useNavigate} from 'react-router-dom';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate=useNavigate()
  const handlelogout=()=>{
    setCookies("access_token","");
    window.localStorage.clear();
    navigate("/auth");

  }
  return (
    <div className='navbar'>
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create recipe</Link>
      <Link to="/saved-recipe">Saved recipe</Link>
      {!cookies.access_token ? <Link to="/auth">Login/Register</Link> : <button onClick={handlelogout}>logout</button>}
    </div>
    );
  
}

// export default Navbar;