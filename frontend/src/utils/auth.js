export const BASE_URL = 'https://api.wofamesto.nomoreparties.sbs';

function checkAnswerFromServer(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

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
}


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
            if (data.token) {
                const token = data.token;
                localStorage.setItem("token", token);
                return token;
            }
        })
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then(res => checkAnswerFromServer(res))
       
};