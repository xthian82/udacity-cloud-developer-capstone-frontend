import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileSignature, faHeart} from "@fortawesome/free-solid-svg-icons";
import LinesEllipsis from "react-lines-ellipsis";

import inf from '../../assets/inf.png'

class RecipeItem extends Component {

   handleReflow = (rleState) => {
      const { clamped, text } = rleState
   }

    render() {

       const {
          publisher,
          recipe_id,
          title} = this.props.recipe;

       const {handleDetails} = this.props;

       const image_url = this.props.recipe.image_url || inf;
       const social_rank = this.props.recipe.social_rank || 0;

        return (
           <React.Fragment>
               <div className="col-10 mx-auto col-md-5 col-lg-4 my-2">
                  <div className="card top-round-20 bottom-round-20">
                     <img
                        src={image_url}
                        className="img-card-top top-round-20"
                        style={{height: "18rem"}}
                        alt="recipe"/>
                     <div className="card-body text-body-img text-capitalize">
                        <h6>
                           <LinesEllipsis
                              text={title}
                              onReflow={this.handleReflow}
                              maxLine={1}
                           />
                        </h6>
                        <h6 className="text-warning text-publisher">
                           provided by {publisher}
                        </h6>
                     </div>
                     <div className="card-footer bottom-round-20">

                        <button
                           type="button"
                           className="btn btn-success text-capitalize rounded-pill"
                           onClick={() => handleDetails(0, recipe_id)} >
                           <FontAwesomeIcon icon={faFileSignature} className="mr-1" />
                           Details
                        </button>
                        <span
                           className="btn">
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

export default RecipeItem;
