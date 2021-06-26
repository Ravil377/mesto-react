import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupConfirmationDelete from "./PopupConfirmationDelete";

function App() {
    const [isConfirmationDelete, setIsConfirmationDelete] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState();
    const [selectedCardForDelete, setSelectedCardForDelete] = React.useState([]);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getProfileInfo()
            .then((res) => setCurrentUser(res))
            .catch((err) => console.log(err));
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDeleteCard = () => {
        api.deleteCard(selectedCardForDelete._id)
            .then((res) => {
                setCards(() => cards.filter((card) => card._id !== selectedCardForDelete._id));
                setIsConfirmationDelete(false);
            })
            .catch((err) => console.log(err));
    };

    const handleDeleteClick = (card) => {
        setSelectedCardForDelete(card);
        setIsConfirmationDelete(true);
    }

    const handleCardLike = (props) => {
        const isLiked = props.likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(props._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((card) => (card._id === props._id ? newCard : card)));
            })
            .catch((err) => console.log(err));
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen((state) => !state);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen((state) => !state);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen((state) => !state);
    };

    const handleCardClick = (elem) => setSelectedCard(elem);

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmationDelete(false);
        setSelectedCard(null);
        setSelectedCardForDelete(null);
    };

    const handleUpdateUser = (name, about) => {
        api.postProfileInfo(name, about)
            .then((res) => {
                setCurrentUser(res);
                setIsEditProfilePopupOpen(false);
            })
            .catch((err) => console.log(err));
    };

    const handleUpdateAvatar = (avatar) => {
        api.postProfileAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                setIsEditAvatarPopupOpen(false);
            })
            .catch((err) => console.log(err));
    };

    const handleAddPlaceSubmit = (nameCard, linkCard) => {
        api.postCard(nameCard, linkCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setIsAddPlacePopupOpen(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Header />
                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditProfile={handleEditProfileClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteClick}
                    />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                    <PopupConfirmationDelete isOpen={isConfirmationDelete} onClose={closeAllPopups} onYes={handleDeleteCard} />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                    <Footer />
                </div>
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
