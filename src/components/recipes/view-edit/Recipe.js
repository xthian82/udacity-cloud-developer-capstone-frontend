import React from 'react';
import { Button} from 'react-bootstrap'; //, Card
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import noimage from '../../../assets/inf.png'

const Recipe = ({
                 recipeId,
                 publisher,
                 attachmentUrl,
                 userId,
                 category,
                 createdAt,
                 socialRank,
                 ingredients,
                 title,
                 handleRemoveRecipe
              }) => {

   const img = attachmentUrl || noimage
   return (


      <Card>
         <div className="col-7 mx-auto col-md-7 mr-1">
         <Card.Content className={"fa-pull-left"}>
            <Card.Header className={"card-title"}>
               <Link to={`/edit-recipe/${recipeId}`}>{title}</Link>
            </Card.Header>
            <Card.Description className={"text-ingredient-detail"}>
               <i>Number of Ingredients: ({ingredients?.length || 0})</i>
            </Card.Description>
            <Card.Description className={"card-item"}>
               Date: {createdAt}s
            </Card.Description>
            <Card.Description>
               Category: {category}
            </Card.Description>
            <Card.Description>
               Total Supporters: {socialRank}
            </Card.Description>
         </Card.Content>
         <Card.Content className={"fa-pull-right"}>
            <img src={img} width="130" height="100" alt=""/>
            <a href={`/edit-recipe/${recipeId}`} type="button" className="btn btn-primary">
               <FontAwesomeIcon icon={faEdit}/>
            </a>
            &nbsp;
            <Button variant="danger" onClick={() => handleRemoveRecipe(recipeId)}>
               <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
         </Card.Content>
         </div>
      </Card>
   );
};
export default Recipe;
