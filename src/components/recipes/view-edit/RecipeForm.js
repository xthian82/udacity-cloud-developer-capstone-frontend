import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
// import { v4 as uuidv4 } from 'uuid';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faTrash} from "@fortawesome/free-solid-svg-icons";
import noimage from "../../../assets/inf.png";
import {useAuth0} from "@auth0/auth0-react";
import {createRecipe, getUploadUrl, patchRecipe, uploadFileToBucket} from "../../../api/backend-api";

const RecipeForm = (props) => {
   const [recipe, setRecipe] = useState(() => {
      return {
         //recipeId: props.recipe ? props.recipe.recipeId: null,
         attachmentUrl: props.recipe ? props.recipe.attachmentUrl : '',
         category: props.recipe ? props.recipe.category : '',
         title: props.recipe ? props.recipe.title : '',
         ingredients: props.recipe ? props.recipe.ingredients : [],
         createdAt: props.recipe ? props.recipe.createdAt : ''
      }
   });

   const [selectedFile, setSelectedFile] = useState(null)
   const [errorMsg, setErrorMsg] = useState('');
   const [item, setItem] = useState('');
   const isEdit = props.edit;
   const recipeId = props.recipe ? props.recipe.recipeId: null;

   const { title, category, attachmentUrl } = recipe;

   let ingredients = recipe.ingredients || [];
   const img = attachmentUrl || noimage
   let token = ''

   const {
      getIdTokenClaims
   } = useAuth0();

   const getToken = async () => {
      if (token.length === 0) {
         console.log('getting token')
         const idToken = await getIdTokenClaims();
         token = idToken.__raw
      }
      console.log(`returninng token ${token}`)
      return token
   }

   const handleOnSubmit = async (event) => {
      event.preventDefault();
      const values = [title];
      let errorMsg = '';

      const allReqFieldsFilled = values.every((field) => {
         const value = `${field}`.trim();
         return value !== '' && value !== '0';
      });

      if (allReqFieldsFilled) {
         // const id = (isEdit ? recipe.recipeId : uuidv4())
         const idToken = await getToken()

         let id = recipeId

         if (isEdit) {
            await patchRecipe(idToken, recipeId, recipe)
         } else {
            id = await createRecipe(idToken, recipe)
         }

         if (id !== undefined) {
            await uploadFile(idToken, id)
         }

         props.handleOnSubmit(recipe);
      } else {
         errorMsg = 'Please fill the title.';
      }
      setErrorMsg(errorMsg);
   };

   const uploadFile = async (idToken, recipeId) => {
      try {
         if (!selectedFile) {
            return
         }

         //this.setUploadState(UploadState.FetchingPresignedUrl)
         const urlLink = await getUploadUrl(idToken, recipeId)

         console.log(`link obtained = ${JSON.stringify(urlLink)}`)

         // this.setUploadState(UploadState.UploadingFile)
         await uploadFileToBucket(urlLink.uploadUrl, selectedFile)

         recipe.attachmentUrl = urlLink.attachmentUrl

         await patchRecipe(idToken, recipeId, recipe)

         // alert('File was uploaded!')
      } catch (e) {
         console.log(e)
         // alert('Could not upload a file: ' + e.message)
      } finally {
         // this.setUploadState(UploadState.NoUpload)
      }
   }

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      switch (name) {
         default:
            setRecipe((prevState) => ({
               ...prevState,
               [name]: value
            }));
            break;
      }
      setErrorMsg('')
   };

   const createIngredientsUI = () => {
      return ingredients.map((el, i) =>
            <div className={"row form-group"} key={i}>
               <input type="text" className={"form-group prepend"} value={el||''} onChange={handleIngredientChange.bind(this, i)} />

              <Button variant={"danger"} className="btn btn-danger form-group" onClick={removeIngredient.bind(this, i)}>
                 <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
      )
   }

   const handleIngredientChange = (i, event) => {

      console.log(`handle ingredient change ${i} = ${event}`);
      let values = [...ingredients];
      values[i] = event.target.value;
      ingredients = values;
      setRecipe((prevState) => ({
         ...prevState,
         ingredients: values
      }));
      setErrorMsg('')
   }

   const addIngredient = () => {
      if (!item) {
         setErrorMsg('Please specify the ingredient');
         return;
      }

      let ing = ingredients;
      ing.push(item);
      setRecipe((prevState) => ({
         ...prevState,
         ingredients: ing
      }));

      setItem('');
      setErrorMsg('')
   }

   const removeIngredient = (i) => {
      let values = [...ingredients];
      values.splice(i,1);
      ingredients = values;

      setRecipe((prevState) => ({
         ...prevState,
         ingredients: values
      }));
   }

   const handleFileChange = (event) => {
      const files = event.target.files
      if (!files) return

      console.log(`changing file ${files[0].name}`)
      setSelectedFile(files[0])
   }

   return (
      <div className="mx-auto col-md-8">
      <div className="main-form">
         {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}

         <Form onSubmit={handleOnSubmit}>

            <div className={"form"}>
               <Form.Group controlId="title">
                  <Form.Label>Recipe Title</Form.Label>
                  <Form.Control
                     className="input-control form-group"
                     type="text"
                     name="title"
                     value={title}
                     placeholder="Enter a title"
                     onChange={handleInputChange}
                  />

                  <Form.Label>Category</Form.Label>
                  <Form.Control
                     className="input-control form-group"
                     type="text"
                     name="category"
                     value={category}
                     placeholder="keto, spicy... "
                     onChange={handleInputChange}
                  />
                  <Form.Label><img src={img} width="130" height="100" alt=""/></Form.Label>

                  <Form.Label className={"mr-1"}>Recipe Pic</Form.Label>
                  <input
                     type="file"
                     accept="image/*"
                     placeholder="Image to upload"
                     onChange={handleFileChange}
                  />
               </Form.Group>
            </div>

            <div className={"form-group"}>
               <Form.Label>Ingredient</Form.Label>
               <div className={"input-group"}>
                  <Form.Control
                     className="form-control prepend"
                     type="text"
                     value={item}
                     name="ingredient"
                     placeholder="add ingredient..."
                     onChange={event => setItem(event.target.value)}
                  />
                  <div className="input-group-append">
                     <input type='button' className={"btn btn-success prepend"} value='Add' onClick={addIngredient.bind(this)}/>
                  </div>
               </div>
            </div>
            <div className="form-group">
               {createIngredientsUI()}
            </div>
            <Button variant="primary" type="submit" className="submit-btn mb-3">
               <FontAwesomeIcon icon={faPaperPlane} className="mr-1"/> { isEdit ? 'Update' :'Add Recipe'}
            </Button>
         </Form>
      </div>
      </div>
   );
};

export default RecipeForm;
