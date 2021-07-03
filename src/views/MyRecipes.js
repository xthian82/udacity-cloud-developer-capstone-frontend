import React, {Fragment, useEffect, useState} from 'react';
import _ from 'lodash';
import Recipe from "../components/recipes/view-edit/Recipe";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../components/Loading";
import {deleteRecipe, getRecipes} from "../api/backend-api";

export const MyRecipes = () => {

   const [recipes, setRecipes] = useState([])

   let [token] = useState('')

   const {
      getIdTokenClaims
   } = useAuth0();

   const handleRemoveRecipe = (recipeId) => {
      confirmAlert({
         title: 'Confirm',
         message: 'Are you sure ?',
         buttons: [
            {
               label: 'Yes',
               onClick: async () => {
                  const token = await getToken()
                  await deleteRecipe(token, recipeId)
                  setRecipes(recipes.filter((recipe) => recipe.recipeId !== recipeId));
               }
            },
            {
               label: 'No',
               onClick: () => { return; }
            }
         ]
      });

   };

   const getToken = async () => {
      if (token.length === 0) {
         console.log('getting token')
         const idToken = await getIdTokenClaims();
         token = idToken.__raw
      }
      // console.log(`returning = ${token}`)
      return token
   }

   useEffect(() => {
      async function fetchData() {
         try {
            const token = await getToken()
            console.log('fetching recipes')
            const response = await getRecipes(token)
            setRecipes(response)
         } catch (error) {
            console.log(error);
         }
      }

      fetchData()

   }, []);

   return (
      <Fragment>
         <div className="fluid-container">
            <div className="d-flex mx-auto col-md-9 mb-2">
               <a href="/add-recipe" type="button" className="btn btn-success add-button fa-pull-right">Add Recipe
               </a>
            </div>
            <div>
               {!_.isEmpty(recipes) ? (
                  recipes.map((recipe) => (
                     <Recipe key={recipe.recipeId} {...recipe} handleRemoveRecipe={handleRemoveRecipe} />
                  ))
               ) : (
                  <p className="message">No Recipes available. Please add some recipes.</p>
               )}
            </div>
         </div>
      </Fragment>
   );

}

export default withAuthenticationRequired(MyRecipes, {
   onRedirecting: () => <Loading/>,
});
