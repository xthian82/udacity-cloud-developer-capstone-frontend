import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faSearch} from "@fortawesome/free-solid-svg-icons";

class RecipeSearch extends Component {

   render() {
      const {value, handleSubmit, handleChange} = this.props;

      return (
         <React.Fragment>
            <div className="container">
               <div className="row">
                  <div className="col-10 mx-auto col-md-7 text-center">
                     <h1 className="text-slanted">
                        Look for others
                     </h1>
                     <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="input-group">
                           <input type="text"
                                  name="search"
                                  className="form-control"
                                  placeholder="chicken,onions,carrots"
                                  value={value}
                                  onChange={handleChange}
                           />

                           <div className="input-group-append">
                              <button type="submit" className="input-group-text bg-primary text-white">
                                 <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                              </button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default RecipeSearch;
