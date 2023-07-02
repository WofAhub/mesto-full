export const BASE_URL = 'https://api.wofamesto.nomoreparties.sbs';

// универсальная функция
const makeRequest = (url, method, body, token) => {
    const options = {
        url,
        method,
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    if (token === undefined) {
        options.headers.Authorization = `Bearer ${token}`
    }

    return fetch(`${BASE_URL}${url}`, options)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            console.log("Ошибка в makeRequest, then");
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

// регистрация
export const register = (email, password) => {
    return makeRequest(
        '/signup', 
        'POST', 
        {email, password}
    )
}

// логин
export const login = (email, password) => {
    return makeRequest(
        '/signin', 
        'POST', 
        {email, password}
    )
};

// получение меня
export const getMe = (token) => {
    return makeRequest(
        '/users/me', 
        'GET',
        null, 
        token
    )
};