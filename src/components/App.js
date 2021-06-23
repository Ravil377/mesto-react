import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const handleEditProfileClick = () => setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    const handleAddPlaceClick = () => setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    
    const handleCardClick = (elem) => setSelectedCard(elem);

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    };

    return (
        <>
            <div className="page">
                <Header />
                <Main onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick} />
                <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                    <>
                        <input type="text" name="name" placeholder="Имя" id="fio-input" className="popup__input popup__input_type_name" minLength="2" maxLength="40" required />
                        <span className="popup__input-error fio-input-error"></span>
                        <input type="text" name="about" placeholder="О себе" id="info-input" className="popup__input popup__input_type_info" minLength="2" maxLength="200" required />
                        <span className="popup__input-error info-input-error"></span>
                        <button type="submit" className="popup__container-submit-button popup__container-submit-button_edit-button">
                            Сохранить
                        </button>
                    </>
                </PopupWithForm>

                <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                    <>
                        <input type="text" name="name" placeholder="Название" id="name-input" className="popup__input popup__input_name_card" minLength="2" maxLength="30" required />
                        <span className="popup__input-error name-input-error"></span>
                        <input type="url" name="link" placeholder="Ссылка на картинку" id="foto-input" className="popup__input popup__input_foto_card" required />
                        <span className="popup__input-error foto-input-error"></span>
                        <button type="submit" className="popup__container-submit-button popup__container-submit-button_add-button">
                            Сохранить
                        </button>
                    </>
                </PopupWithForm>

                <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                    <>
                        <input type="url" name="avatar" placeholder="Ссылка на картинку" id="avatar-input" className="popup__input popup__input_avatar" required />
                        <span className="popup__input-error avatar-input-error"></span>
                        <button type="submit" className="popup__container-submit-button popup__container-submit-button_avatar">
                            Сохранить
                        </button>
                    </>
                </PopupWithForm>
                
                {selectedCard && 
                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                }
                <Footer />
            </div>
        </>
    );
}

export default App;
