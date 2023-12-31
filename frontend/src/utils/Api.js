class Api {
  constructor({ fetchUrl, headers }) {
    this._fetchUrl = fetchUrl;
    this._headers = headers;
  }

  // получаем json, если ответ пришел
  _getJson (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // устанавливаю головы
  _setHeaders () {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      ...this._headers,
    };
  }

  // получаем карточки с сервера
  getInitialCards() {
    return fetch(`${this._fetchUrl}/cards`, {
      headers: this._setHeaders(),
    })
    .then(this._getJson)
  }

  // получаем информацию о пользователе
  getCurrentUser() {
    return fetch (`${this._fetchUrl}/users/me`, {
      headers: this._setHeaders(),
    })
    .then(this._getJson);
  }

  // создаем новые карточки на сервер
  createCardByPopup(data) {
    return fetch (`${this._fetchUrl}/cards`, {
      method: "POST",
      headers: this._setHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._getJson);
  }

  // удалить карточку
  deleteCard(id) {
    return fetch(`${this._fetchUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._setHeaders(),
    })
    .then(this._getJson);
  }

  // поставить лайк
  like(id) {
    return fetch(`${this._fetchUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._setHeaders(),
    })
    .then(this._getJson);
  }

  // убрать лайк
  dislike(id, token) {
    return fetch(`${this._fetchUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._setHeaders(),
    })
    .then(this._getJson);
  }

  // редактирование информации о пользователе через попап Профиля
  editUserInfo(data) {
    return fetch(`${this._fetchUrl}/users/me`, {
      method: "PATCH",
      headers: this._setHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getJson);
  }

  // редактирование аватара пользователя через попап Аватара
  editUserAvatar(data) {
    return fetch(`${this._fetchUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._setHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._getJson);
  }
  
  // лайки-дизалайки вместе - условие
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.like(cardId);
    } else {
      return this.dislike(cardId);
    }
  }
}

export const api = new Api({
  fetchUrl: 'https://api.wofamesto.nomoreparties.sbs',
  headers: {
  'Accept': 'application/json',
  'Content-type': 'application/json',
  }
})
