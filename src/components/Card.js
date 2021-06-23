import React from "react";

function Card(props) {
    const handleClick = () => props.onCardClick(props.card);

    return (
        <li className="element" onClick={handleClick}>
            <button type="button" className="element__delete-button"></button>
            <img src={props.card.link} className="element__image" alt={props.card.name} id="image" />
            <div className="element__down-sector">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like">
                    <button type="button" className="element__like-button"></button>
                    <p className="element__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
