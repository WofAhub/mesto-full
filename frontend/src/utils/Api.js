class Api {
  constructor(options) {
    this._fetchUrl = options.fetchUrl;
    this._headers = options.headers;
  }

  // получаем json, если ответ пришел
  _getJson (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // получаем карточки с сервера
  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._fetchUrl}/cards`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._getJson)
  }

  // создаем новые карточки на сервер
  createCardByPopup(data) {
    const token = localStorage.getItem('jwt');
    return fetch (`${this._fetchUrl}/cards`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._getJson);
  }

  // удалить карточку
  deleteCard(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._fetchUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._getJson);
  }

  // поставить лайк
  like(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._fetchUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._getJson);
  }

  // убрать лайк
  dislike(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._fetchUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._getJson);
  }

  // получаем информацию о пользователе
  getCurrentUser() {
    const token = localStorage.getItem('jwt');
    return fetch (`${this._fetchUrl}/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._getJson);
  }

  // редактирование информации о пользователе через попап Профиля
  editUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._fetchUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getJson);
  }

  // редактирование аватара пользователя через попап Аватара
  editUserAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._fetchUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
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

  // устанавливаю токен
  // setToken(token) { 
  //   this._headers.Authorization = `Bearer ${token}`; 
  // } 
}

export const api = new Api({
  fetchUrl: 'https://api.wofamesto.nomoreparties.sbs',
  // headers: {
  //   'Content-Type': 'application/json',
  // }
})