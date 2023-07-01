export const BASE_URL = 'https://api.wofamesto.nomoreparties.sbs';

// проверка ответа с сервера
function checkAnswerFromServer(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

// регистрация
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => checkAnswerFromServer(res))
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(`Ошибка в register, auth: ${err}`)
        })
}

// логин
export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => checkAnswerFromServer(res))
        .then((data) => {
            localStorage.setItem('jwt', data.jwt);
            return data;
        })
};

// проверка токена
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then(res => checkAnswerFromServer(res))
        .then(data => data)
};