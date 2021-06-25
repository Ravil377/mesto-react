import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const nameCard = React.useRef();
    const linkCard = React.useRef();

    const handleSubmitPlaceAdd = (e) => {
        e.preventDefault();
        props.onAddPlace(nameCard.current.value, linkCard.current.value);
    };

    return (
        <PopupWithForm name="add-card" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmitPlaceAdd}>
            <>
                <input type="text" ref={nameCard} name="name" placeholder="Название" id="name-input" className="popup__input popup__input_name_card" minLength="2" maxLength="30" required />
                <span className="popup__input-error name-input-error"></span>
                <input type="url" ref={linkCard} name="link" placeholder="Ссылка на картинку" id="foto-input" className="popup__input popup__input_foto_card" required />
                <span className="popup__input-error foto-input-error"></span>
                <button type="submit" className="popup__container-submit-button popup__container-submit-button_add-button">
                    Сохранить
                </button>
            </>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
