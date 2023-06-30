class Api {
  constructor(options) {
    this._fetchUrl = options.fetchUrl;
    this._headers = options.headers;
  }

  // получаем json, если ответ пришел
  _getJson (res) {
    if (res.ok) {
      console.log(res, "Это res из _getJson в api")
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // получаем карточки с сервера
  getInitialCards() {
    return fetch(`${this._fetchUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._getJson, console.log(this, "Это this из getInitialCards в api"))
    .catch(err => console.log(err, "Это err из getInitialCards в api")) 
  }

  // создаем новые карточки на сервер
  // createCardByPopup(data) {
  //   return fetch (`${this._fetchUrl}/cards`, {
  //     method: "POST",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: data.name,
  //       link: data.link
  //     })
  //   })
  //   .then(this._getJson);
  // }

  // удалить карточку
  // deleteCard(id) {
  //   return fetch(`${this._fetchUrl}/cards/${id}`, {
  //     method: "DELETE",
  //     headers: this._headers
  //   })
  //   .then(this._getJson);
  // }

  // поставить лайк
  // like(id) {
  //   return fetch(`${this._fetchUrl}/cards/${id}/likes`, {
  //     method: "PUT",
  //     headers: this._headers
  //   })
  //   .then(this._getJson);
  // }

  // убрать лайк
  // dislike(id) {
  //   return fetch(`${this._fetchUrl}/cards/${id}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers
  //   })
  //   .then(this._getJson);
  // }

  // получаем информацию о пользователе
  getCurrentUser() {
    return fetch (`${this._fetchUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(this._getJson, console.log(this, "Это this из getCurrentUser в api"))
    .catch(err => console.log(err, "Это err из getCurrentUser в api")) 
  }

  // редактирование информации о пользователе через попап Профиля
  // editUserInfo(data) {
  //   return fetch(`${this._fetchUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: data.name,
  //       about: data.about
  //     })
  //   })
  //   .then(this._getJson);
  // }

  // редактирование аватара пользователя через попап Аватара
  // editUserAvatar(data) {
  //   return fetch(`${this._fetchUrl}/users/me/avatar`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       avatar: data.avatar,
  //     })
  //   })
  //   .then(this._getJson);
  // }
  
  // лайки-дизалайки вместе - условие
  // changeLikeCardStatus(cardId, isLiked) {
  //   if (isLiked) {
  //     return this.like(cardId);
  //   } else {
  //     return this.dislike(cardId);
  //   }
  // }

  // устанавливаю токен
  // setToken(token) { 
  //   this._headers.Authorization = `Bearer ${token}`; 
  // } 
}

export const api = new Api({
  fetchUrl: 'https://api.wofamesto.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json',
  }
})
