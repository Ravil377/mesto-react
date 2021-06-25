import React from "react";

function PopupConfirmationDelete(props) {
    return (
        <div className={`popup popup_imageDelete ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button type="button" className="popup__button-close"></button>
                <h2 className="popup__container-title popup__container-title_mb">Вы уверены?</h2>
                <button type="button" className="popup__container-submit-button popup__container-submit-button_delete-button" onClick={props.onYes}>
                    Да
                </button>
            </div>
        </div>
    );
}

export default PopupConfirmationDelete;
