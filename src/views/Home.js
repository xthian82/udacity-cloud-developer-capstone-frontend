import React, {Fragment, useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';

import RecipeList from "../components/recipes/RecipeList";
import {searchRecipes} from "../api/backend-api";

export const Home = () => {
   const [recipes, setRecipes] = useState([])
   const [pageCount, setPageCount] = useState(1)
   const [search, setSearch] = useState("")
   const [query, setQuery] = useState(null)
   const [error, setError] = useState(null)
   const [current, setCurrent] = useState({})

   const [currentPage, setCurrentPage] = useState(0)
   const [offset, setOffset] = useState(0)
   const recipesPerPage = 9

   const getRecipes = () => {
      try {
         const data = recipes.slice(offset, offset + recipesPerPage);

         setRecipes(data)
         setPageCount(Math.ceil(recipes.length / recipesPerPage))
      } catch (e) {
         console.log(e);
      }
   }

   const handleDetails = (index, id) => {

      const current = recipes.filter((recipe) => recipe.recipeId === id)
      setCurrent(current)
   }

   const handlePageClick = (e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * recipesPerPage;

      setCurrentPage(selectedPage)
      setOffset(offset)

      getRecipes()
   };

   const displayPage = () => {
      return (
         <div>
         <RecipeList recipes={recipes}
            handleDetails={handleDetails}
            value={search}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
                     error={error} />

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
               pageCount={pageCount}
               marginPagesDisplayed={3}
               pageRangeDisplayed={6}
               onPageChange={handlePageClick}
               activeClassName={"active"}/>
            </div>
            </div>
            </div>
         </div>
      )
   }

   const handleChange = (e) => {
      setSearch(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      setQuery(search)
      setSearch("")
   }

   useEffect(() => {
      async function fetchData() {
         try {
            console.log(`fetching recipes with q=${query}`)
            const response = await searchRecipes(query)
            setRecipes(response)
         } catch (error) {
            console.log(error);
         }
      }

      fetchData()

      return () => {}
   }, [query]);


   return (
      <Fragment>
         { displayPage() }
      </Fragment>
   )

}

export default Home;
