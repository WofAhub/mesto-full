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
                console.log(data, "Это data из login в auth")
                const token = data.token;
                localStorage.setItem("token", token);
                console.log(token, "Это токен из login в auth")
                return token;
            }
        })
        .catch(err => console.log(err))
};

export const getContent = (token) => {
    console.log(token, "Это токен из getContent в auth")
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