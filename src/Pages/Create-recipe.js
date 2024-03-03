import React, { useState } from 'react'
import axios from 'axios'
import { useGetUser } from '../Hooks/useGetUser.js';


const Createrecipe = () => {
  const userid = useGetUser();
  const [recipes,setRecipes]=useState({
    name:"",
    ingredients:[],
    instructions:"",
    imageUrl:"",
    CookingTime:0,
    userOwner:userid
  })
  
  const handlesubmit= async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:4000/recipe/",recipes);
      alert("recipe created")
      console.log(userid)
    }catch(error){
      console.log(error)
    }
  }

  const handlechange=(e)=>{
    const {name,value}=e.target;
    setRecipes({...recipes,[name]:value})
    console.log(recipes)
  }

  const handleclick=(e)=>{
    setRecipes({...recipes,ingredients:[...recipes.ingredients,""]})
  }

  const changeinarray = (e,idx)=>{
    const {value}=e.target;
    const ingredients=recipes.ingredients
    ingredients[idx]=value;
    setRecipes({...recipes,ingredients:ingredients});
  }

  return (
    <div className='create-recipe'>

    <h2>Create Recipe</h2>

    <form onSubmit={handlesubmit}>
    <label htmlFor='name'>Name:</label>
    <input type="text" id="name" name='name' value={recipes.name} onChange={handlechange}/>

    <label htmlFor='ingredients'>Ingredients:</label>
    {recipes.ingredients.map((ingredient,idx)=>(
      <input
      key={idx}
      type='text'
      name='ingredients'
      onChange={(e)=>changeinarray(e,idx)}
      />
    )
    )}
    <button type='button' onClick={handleclick}>Add Ingredients</button>
    
    <label htmlFor='instruction'>Instruction:</label>
    <textarea type="text" id="instruction" name='instructions' value={recipes.instructions} onChange={handlechange}/>

    <label htmlFor='image'>ImageUrl:</label>
    <input type="text" id="image" name='imageUrl' value={recipes.imageUrl} onChange={handlechange}/>

    <label htmlFor='cooking-time'>CookingTime:</label>
    <input type="text" id="cooking-time" name='CookingTime' value={recipes.CookingTime} onChange={handlechange}/>

    <button type='submit'>Add recipes</button>

    </form>
  
    </div>
  )
}

export default Createrecipe;