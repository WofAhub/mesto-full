class Api {
  constructor(options) {
    this._fetchUrl = options.fetchUrl;
  }

  // устанавливаю токен
  // setToken(token) {
  //   this._headers.Authorization = `Bearer ${token}`;
  //   console.log(token, 'Токен из api, setToken');
  // }

  // получаем json, если ответ пришел
  _getJson (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // получаем карточки с сервера
  getInitialCards(token) {
    return fetch(`${this._fetchUrl}/cards`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._getJson)
  }

  // создаем новые карточки на сервер
  createCardByPopup(data, token) {
    return fetch (`${this._fetchUrl}/cards`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._getJson);
  }

  // удалить карточку
  deleteCard(id, token) {
    return fetch(`${this._fetchUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(this._getJson);
  }

  // поставить лайк
  like(id, token) {
    return fetch(`${this._fetchUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(this._getJson);
  }

  // убрать лайк
  dislike(id, token) {
    return fetch(`${this._fetchUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(this._getJson);
  }

  // получаем информацию о пользователе
  getCurrentUser(token) {
    return fetch (`${this._fetchUrl}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
    })
    .then(this._getJson);
  }

  // редактирование информации о пользователе через попап Профиля
  editUserInfo(data, token) {
    return fetch(`${this._fetchUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getJson);
  }

  // редактирование аватара пользователя через попап Аватара
  editUserAvatar(data, token) {
    return fetch(`${this._fetchUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
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
  fetchUrl: 'https://api.wofamesto.nomoreparties.sbs'
})
