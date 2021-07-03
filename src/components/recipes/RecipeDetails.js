import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {recipe} from "../../utils/tempDetails";
import {faChevronCircleLeft, faHeart,} from "@fortawesome/free-solid-svg-icons";

class RecipeDetails extends Component {

   constructor(props) {
      super(props);

      this.state = {
         recipe: recipe,
         url: `someurl?id=${this.props.id}`,
         handleIndex: 1
      }
   }

   async componentDidMount() {
      try {
         //const data = await fetch(url);
         //const jsonData = await data.json();
         this.setState({
            recipe: recipe
         });
      } catch (e) {
         console.log(e);
      }
   };

   render() {

      const {
         image_url,
         publisher,
         title,
         social_rank,
         ingredients
      } = this.state.recipe;

      const {handleIndex} = this.props;
      console.log(`id = ${handleIndex}`);
      return (

         <React.Fragment>
            <div className="container">
               <div className="row">
                  <div className="col-10 mx-auto col-md-6 my-3">
                     <button
                        type="button"
                        className="btn btn-warning mb-5 text-capitalize"
                        onClick={() => handleIndex(1) }
                     >
                        <FontAwesomeIcon icon={faChevronCircleLeft} className="mr-1" />
                         Back
                     </button>
                     <img
                        src={image_url}
                        className="d-block w-100 full-round-22"
                        alt=""/>
                  </div>
                  <div className="col-10 mx-auto col-md-6 my-3">
                     <h6 className="text-uppercase">{title}</h6>
                     <h6 className="text-warning text-capitalize text-publisher-med">
                        provided by {publisher}
                     </h6>
                     <ul className="list-group mt-4">
                        <h2 className="mt-3 mb-4">Ingredients</h2>
                        {
                           ingredients.map((item, index) => {
                              return(
                                 <li className="list-group-item text-ingredient">
                                    {item}
                                 </li>
                              )
                           })
                        }
                     </ul>
                     <span className="btn">
                        <FontAwesomeIcon color="red" icon={faHeart} className="mr-1" />
                        <span>{social_rank}</span>
                     </span>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default RecipeDetails;
