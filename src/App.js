import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from "./Pages/Home.js";
import Auth from "./Pages/Auth.js";
import Createrecipe from "./Pages/Create-recipe.js";
import Savedrecipe from "./Pages/Saved-recipe.js";
import {Navbar} from './Components/Navbar.js';
function App(){
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/create-recipe" element={<Createrecipe/>}></Route>
        <Route path="/saved-recipe" element={<Savedrecipe/>}></Route>
      </Routes>
      <navbar/>
    </div>
  );
}

export default App;
