import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faHeart} from "@fortawesome/free-solid-svg-icons";
import noImg from '../../assets/inf.png'
import _ from "lodash";

export const RecipeDetails = (props) => {

   const [recipe, setRecipe] = useState(() => {
      return {
         attachmentUrl: props.recipe ? props.recipe.attachmentUrl : noImg,
         category: props.recipe ? props.recipe.category : 'no category',
         socialRank: props.recipe ? props.recipe.socialRank : 0,
         title: props.recipe ? props.recipe.title : '',
         ingredients: props.recipe ? props.recipe.ingredients : [],
         createdAt: props.recipe ? props.recipe.createdAt : ''
      }
   });

   useEffect(() => {
      async function fetchData() {
         try {
            setRecipe(props.recipe)
         } catch (error) {
            console.log(error);
         }
      }

      fetchData()

      return () => {}
   }, []);

      return (

         <React.Fragment>
            <div className="container">
               <div className="row">
                  <div className="col-10 mx-auto col-md-6 my-3">

                     <img
                        src={recipe.attachmentUrl}
                        className="d-block w-100 d-flexs full-round-22"
                        alt=""/>
                  </div>
                  <div className="col-10 mx-auto col-md-6 my-3">
                     <h6 className="text-uppercase">{recipe.title}</h6>
                     <h6>{recipe.category}</h6>
                     <h6 className="text-warning text-capitalize text-publisher-med">
                        provided by {recipe.publisher}
                     </h6>
                     <h6 className="text-uppercase">{recipe.category}</h6>
                     <ul className="list-group mt-4">
                        <h2 className="mt-3 mb-4">Ingredients</h2>
                        {

                        !_.isEmpty(recipe.ingredients) ? (
                           recipe.ingredients.map((item, index) => {
                              return(
                                 <li className="list-group-item text-ingredient">{item}</li>
                              )
                           })) : (<p className="message">No ingredients.</p>)
                        }
                     </ul>
                     <h6 className="text-uppercase">Created: {recipe.createdAt}</h6>
                     <span className="btn">
                        <FontAwesomeIcon color="red" icon={faHeart} className="mr-1" />
                        <span>{recipe.socialRank}</span>
                     </span>
                  </div>
               </div>
            </div>
         </React.Fragment>
      )
}

export default RecipeDetails;
