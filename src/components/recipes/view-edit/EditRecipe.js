import React, {useEffect, useState} from 'react';
import RecipeForm from "./RecipeForm";
import { useParams } from 'react-router-dom';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../../Loading";
import _ from "lodash";
import {getRecipeById} from "../../../api/backend-api";

const EditRecipe = ({ history }) => {
   const { recipeId } = useParams();
   const [recipe, setRecipe] = useState({})

   const {
      getIdTokenClaims
   } = useAuth0();

   const handleOnSubmit = () => {
      history.push('/recipes');
   };

   useEffect(() => {
      async function fetchData() {
         try {
            const idToken = await getIdTokenClaims();
            const item = await getRecipeById(idToken.__raw, recipeId)
            setRecipe(item)
         } catch (error) {
            console.log(error);
         }
      }

      fetchData().then(r => {}).catch(e => {console.log(e)})

      return () => {}
   }, [recipeId]);

   return (
      <div>
         {!_.isEmpty(recipe) ? (
            <RecipeForm recipe={recipe} handleOnSubmit={handleOnSubmit} edit={true} />
         ) : (
            <p className="message">Loading...</p>
         )}
      </div>
   );
};

export default withAuthenticationRequired(EditRecipe, {
   onRedirecting: () => <Loading/>,
});
