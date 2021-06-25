class Api {
    constructor(options) {
        this._options = options;
    }

    _answerForServer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfileInfo() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: {
                authorization: `${this._options.authorization}`,
            },
        }).then((res) => this._answerForServer(res));
    }

    postProfileInfo(name, about) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        }).then((res) => this._answerForServer(res));
    }

    postProfileAvatar(avatar) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: avatar,
            }),
        }).then((res) => this._answerForServer(res));
    }

    postCard(nameCard, linkCard) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: "POST",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameCard,
                link: linkCard,
            }),
        }).then((res) => this._answerForServer(res));
    }
    changeLikeCardStatus(id, isLiked) {
        const methodParametr = isLiked ? "DELETE" : "PUT";
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
            method: methodParametr,
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
        }).then((res) => this._answerForServer(res));
    }

    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: {
                authorization: `${this._options.authorization}`,
            },
        }).then((res) => this._answerForServer(res));
    }

    deleteCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
        }).then((res) => this._answerForServer(res));
    }
}

const apiOptions = {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
    authorization: "ebb98a36-70e4-466a-8500-5c6ce9301133",
};

const api = new Api(apiOptions);

export default api;
 