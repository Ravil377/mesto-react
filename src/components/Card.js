import React from "react";
import PopupConfirmationDelete from "./PopupConfirmationDelete";
import { currentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const [isConfirmationDelete, setIsConfirmationDelete] = React.useState(false);
    const currentUser = React.useContext(currentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    ); 

    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );

    const handleClick = (e) => {
        if(!e.target.classList.contains('element__like-button') && !e.target.classList.contains('element__delete-button')) props.onCardClick(props.card);
    }

    const handleDeleteClick = () => {
        setIsConfirmationDelete(true);      
    }

    const handleClickYes = () => {
        props.onCardDeleteClick(props.card);  
    }

    const handleLikeClick = () => {
        props.onCardLike(props.card);
        setIsConfirmationDelete(false);
    }

    return (
        <>
        <PopupConfirmationDelete isOpen={isConfirmationDelete} onYes={handleClickYes}/>
        <li className="element" onClick={handleClick}>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img src={props.card.link} className="element__image" alt={props.card.name} id="image" />
            <div className="element__down-sector">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="element__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
        </>
    );
}

export default Card;
