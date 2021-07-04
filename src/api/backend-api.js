
import {apiEndpoint} from "../config";
import axios from "axios";

export const getUploadUrl = async (idToken, recipeId) => {
   const response = await axios.post(`${apiEndpoint}/recipes/${recipeId}/attachment`, '', {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${idToken}`
      }
   })
   return response.data.uploadUrl
}

export const uploadFileToBucket = async (uploadUrl, file) => {
   await axios.put(uploadUrl, file)
}

export const searchRecipes = async (searchQuery) =>{

   const response = await axios.get(`${apiEndpoint}/search-recipe${searchQuery ? ('?q='+searchQuery) : ''}`, {
      headers: {
         'Content-Type': 'application/json'
      },
   })
   return response.data?.items
}

export const getRecipes = async (idToken) => {
   const response = await axios.get(`${apiEndpoint}/recipes`, {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${idToken}`
      }})

   return response.data.items
}

export const getRecipeById = async (idToken, recipeId) => {
   const response = await axios.get(`${apiEndpoint}/recipe/${recipeId}`, {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${idToken}`
      }})

   return response.data.items
}

export const getRecipeDetail = async (recipeId) => {
   const response = await axios.get(`${apiEndpoint}/public/recipe/${recipeId}`, {
      headers: {
         'Content-Type': 'application/json'
      }})

   return response.data.items
}

export const createRecipe = async (idToken, newRecipe) => {

   const response = await axios.post(`${apiEndpoint}/recipes`, JSON.stringify(newRecipe), {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${idToken}`
      }})
      .catch(err => {
         console.log(err);
      })
   console.log(`${response}`)
   return response?.data?.item?.recipeId
}

export const patchRecipe = async (idToken, recipeId, updatedRecipe) => {
   await axios.patch(`${apiEndpoint}/recipes/${recipeId}`, JSON.stringify(updatedRecipe),{
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${idToken}`
      }}).then(res => {
   })
      .then(r => console.log('updated'))
      .catch(err => {
         console.log(err);
      })
}

export const deleteRecipe = async (idToken, recipeId) => {
   await axios.delete(`${apiEndpoint}/recipes/${recipeId}`, {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${idToken}`
      }
   })
}
