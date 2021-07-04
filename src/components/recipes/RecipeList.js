import React, {Component} from 'react';
import RecipeItem from "./RecipeItem";
import RecipeSearch from "./RecipeSearch";
import _ from "lodash";

class RecipeList extends Component {
   render() {
      const {
         recipes,
         handleDetails,
         value,
         handleChange,
         handleSubmit,
         error} = this.props;

      return (
         <React.Fragment>

            <RecipeSearch value={value}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit} />

            <div className="container my-5">
               { /* title */}
               <div className="row">
                  <div className="col-10 mx-auto col-md-6 text-center mb-3">
                     <h1 className="text-slanted">
                        Popular Foodies
                     </h1>
                  </div>
               </div>
               { /* end of title */}
               <div className="row">

                  {!_.isEmpty(recipes) ? (
                           recipes.map((recipe) => (
                              <RecipeItem key={recipe.recipeId} recipe={recipe} handleDetails={handleDetails} />
                           ))
                        ) : (
                              <p className="message">No Recipes found, change your query to try new results.</p>
                           )
                  }

               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default RecipeList;
