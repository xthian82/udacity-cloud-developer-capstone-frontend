import React, {Fragment} from 'react';
import RecipeForm from "./RecipeForm";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../../Loading";

const AddRecipe = ({ history }) => {

   const handleOnSubmit = () => {
      history.push('/recipes');
   }

   return (
      <Fragment>
         <RecipeForm handleOnSubmit={handleOnSubmit} />
      </Fragment>
   );
};

export default withAuthenticationRequired(AddRecipe, {
   onRedirecting: () => <Loading/>,
});


