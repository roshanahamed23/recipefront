import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { useGetUser } from '../Hooks/useGetUser';

const Savedrecipe = () => {
  const userID = useGetUser();
  const [recipe,setaRecipe]=useState([]);
  const [savedrecipe,setsavedRecipe]=useState([]);

  useEffect(()=>{

    const fetchsavedRecipe = async () => {
      try{
     const response = await axios.get(`https://recipeback.onrender.com/recipe/saved-recipes/${userID}`);
     setaRecipe(response.data);
      }catch(error){
        console.log(error);
      }
    }
    fetchsavedRecipe();
  
  },[userID])

  return (
    <div>
      <h1>saved-Recipes</h1>
      <ul>
        {recipe.map((recipe)=>(<li key={recipe._id}>
        
          <div>
            <h2>{recipe.name}</h2>
          </div>
          <div> 
            <p>{recipe.instructions}</p>
          </div>
          <img src={recipe.imageUrl} alt={recipe.name}/>
          <p>cooking time:{recipe.CookingTime}</p>
        </li>))}
      </ul>
    </div>
  )
}

export default Savedrecipe