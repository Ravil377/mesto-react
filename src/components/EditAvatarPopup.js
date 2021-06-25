import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatar = React.useRef();

    const handleSubmitAvatar = (e) => {
        e.preventDefault();
        props.onUpdateAvatar(avatar.current.value);
    };

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmitAvatar}>
            <>
                <input type="url" name="avatar" ref={avatar} placeholder="Ссылка на картинку" id="avatar-input" className="popup__input popup__input_avatar" required />
                <span className="popup__input-error avatar-input-error"></span>
                <button type="submit" className="popup__container-submit-button popup__container-submit-button_avatar">
                    Сохранить
                </button>
            </>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
