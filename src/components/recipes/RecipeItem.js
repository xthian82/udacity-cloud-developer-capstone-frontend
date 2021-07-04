import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileSignature, faHeart} from "@fortawesome/free-solid-svg-icons";
import LinesEllipsis from "react-lines-ellipsis";
import Popup from 'reactjs-popup';

import inf from '../../assets/inf.png'
import RecipeDetails from "./RecipeDetails";

class RecipeItem extends Component {

   handleReflow = (rleState) => {
      const { clamped, text } = rleState
   }

    render() {

       const {
          publisher,
          recipeId,
          title} = this.props.recipe;

       const {handleDetails} = this.props;

       const image_url = this.props.recipe.attachmentUrl || inf;
       const social_rank = this.props.recipe.socialRank || 0;

       const contentStyle = { background: 'rgba(100, 100, 100, 0.3)' };
       const overlayStyle = { background: 'rgba(0,0,0,0.8)' };
       const arrowStyle = { color: '#000' }; // style for an svg element

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

                        <Popup
                           trigger={<button
                              type="button"
                              className="btn btn-success text-capitalize rounded-pill"
                           >
                              <FontAwesomeIcon icon={faFileSignature} className="mr-1" />
                              Details
                           </button>}
                           {...{ contentStyle, overlayStyle, arrowStyle }}
                        >
                          <RecipeDetails recipe={this.props.recipe} handleDetails={handleDetails} />
                        </Popup>

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
