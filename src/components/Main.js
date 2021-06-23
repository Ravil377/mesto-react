import React from "react";
import pencil from "./../images/pencil.png";
import api from "./../utils/Api";
import Card from "./Card";

function Main(props) {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getProfileInfo()
            .then((res) => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .catch((err) => console.log(err));
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
            <main className="main">
                <section className="profile">
                    <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                        <img src={userAvatar} alt="Аватарка" className="profile__avatar" />
                        <div className="profile__avatar-overlay">
                            <img src={pencil} alt="Иконка" className="profile__avatar-icon" />
                        </div>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__title profile__title-text">{userName}</h1>
                        <p className="profile__subtitle">{userDescription}</p>
                        <button type="button" className="profile__edit profile__edit-button" id="ed2it" onClick={props.onEditProfile}></button>
                    </div>
                    <button type="button" className="profile__add-button" id="addButton" onClick={props.onAddPlace}></button>
                </section>
                <section className="gallery">
                    <ul className="elements">
                        {cards.map((item) => (
                            <Card key={item._id} onCardClick={props.onCardClick} card={item} />
                        ))}
                    </ul>
                </section>
            </main>
    );
}

export default Main;
