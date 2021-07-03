import React, {Component, Fragment} from "react";
import ReactPaginate from 'react-paginate';

import RecipeList from "../components/recipes/RecipeList";
import RecipeDetails from "../components/recipes/RecipeDetails";
import {recipes} from "../utils/tempList";

class Home extends Component {

   state = {
      recipes: [],
      url: 'http://localhost:4200/api/recipes',
      base_url: 'http://localhost:4200/api/recipes/search',
      details_id: 35382,
      pageIndex: 1,
      search:'',
      query:'?q=',
      currentPage: 0,
      offset:0,
      recipesPerPage: 9
   };


   getRecipes() {
      try {
        /* const data = await fetch(url);
         const jsonData = await data.json();
         if (jsonData.recipes.length === 0) {
            this.setState(() => {
               return {error: "search didn't result any match"}
            })
         } else {
            this.setState(() => {
               return {recipes: jsonData.recipes}
            })
         }*/
         const data = recipes.slice(this.state.offset, this.state.offset + this.state.recipesPerPage);

         this.setState({
            recipes: data,
            pageCount: Math.ceil(recipes.length / this.state.recipesPerPage)
         });
      } catch (e) {
         console.log(e);
      }
   };

   componentDidMount()
   {
      this.getRecipes();
   }


   handleIndex = (index) => {
      this.setState({
         pageIndex: index
      })
   }

   handleDetails = (index, id) => {
      this.setState({
         pageIndex: index,
         details_id: id
      })
   }

   handlePageClick = (e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * this.state.recipesPerPage;

      this.setState({
         currentPage: selectedPage,
         offset: offset
      }, () => {
         this.getRecipes()
      });

   };

   displayPage = (index) => {
      switch (index) {
         default:
         case 1:
            return (
               <div>
               <RecipeList recipes={this.state.recipes}
                  handleDetails={this.handleDetails}
                  value={this.state.search}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                           error={this.state.error} />

                  <div className="container">
                     <div className="row">
                     <div className="col-10 mx-auto col-md-1 text-center p-1">

                  <ReactPaginate
                     previousLabel={"<"}
                     nextLabel={">"}
                     breakLabel={"..."}
                     breakClassName={"page-item"}
                     breakLinkClassName={"page-link"}
                     containerClassName={"pagination"}
                     pageClassName={"page-item"}
                     pageLinkClassName={"page-link"}
                     previousClassName={"page-item"}
                     previousLinkClassName={"page-link"}
                     nextClassName={"page-item"}
                     nextLinkClassName={"page-link"}
                     subContainerClassName={"pages pagination"}
                     pageCount={this.state.pageCount}
                     marginPagesDisplayed={3}
                     pageRangeDisplayed={6}
                     onPageChange={this.handlePageClick}
                     activeClassName={"active"}/>
                  </div>
                  </div>
                  </div>
               </div>
            )
         case 0:
            return (
               <RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex}/>
            )
      }
   }

   handleChange = (e) => {
      this.setState({
         search: e.target.value
      });
      console.log('hello from handle change');
   }

   handleSubmit = (e) => {
      e.preventDefault();

      const {base_url, query, search} = this.state;
      console.log(`hello from handle submit base=${base_url}, q=${query}, s=${search}`);
      this.setState(() => {
         return {
            url: `${base_url}${query}${search}`,
            search: ""
         }}, () => {
         this.getRecipes()
      });
   }

   render()
   {
      return (
         <Fragment>
            { this.displayPage(this.state.pageIndex) }
         </Fragment>
      );
   }

};

export default Home;
