import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { useGetUser } from '../Hooks/useGetUser';

const Home = () => {
  const userID = useGetUser();
  const [recipe,setaRecipe]=useState([]);
  const [savedrecipe,setsavedRecipe]=useState([]);

  useEffect(()=>{

    const fetchRecipe = async () => {
      try{
     const response = await axios.get("https://recipeback.onrender.com/recipe");
     setaRecipe(response.data);
      }catch(error){
        console.log(error);
      }
    }

    const Savedrecipe = async()=>{
      try{
      const response = await axios.get(`https://recipeback.onrender.com/recipe/saved-recipes/ids/${userID}`);
      setsavedRecipe(response.data.savedrecipes);
      console.log(savedrecipe);
      console.log(response.data.savedrecipes);
      }
      catch(error){
      console.log(error);
      }
    }
    fetchRecipe();
    Savedrecipe();
  },[userID])

  const saveButton = async(recipeID)=>{
    try {
      await axios.put("https://recipeback.onrender.com/recipe", {
        recipeID,
        userID,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const isRecipesaved=(id)=>{
    return savedrecipe.includes(id);
  }

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipe.map((recipe)=>(<li key={recipe._id}>
        
          <div>
            <h2>{recipe.name}</h2>
            <button onClick={()=>saveButton(recipe._id)} disabled={isRecipesaved(recipe._id)}>{isRecipesaved(recipe._id) ? "saved" : "save"} </button>
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

export default Home