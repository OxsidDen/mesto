export default class Api {

    constructor({baseUrl, authorization}){
        this._baseUrl = baseUrl;
        this._authorization = authorization;
    }

    getProfile = () => {
        return fetch(this._baseUrl + '/users/me', {
            headers: {
                authorization:  this._authorization
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    };
    
    getCards = () => {
       return  fetch(this._baseUrl + '/cards', {
            headers: {
                authorization:  this._authorization
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    };
    
    changeProfile = (name, about) => {
        return  fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
             headers: {
                 authorization: this._authorization,
                 'Content-Type': 'application/json'
             },
            body: JSON.stringify({
                name: name,
                about: about
              }) 
         })
             .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
     };
    
    addNewPost = (place, link) => {
        return  fetch(this._baseUrl + '/cards', {
            method: 'POST',
             headers: {
                 authorization:  this._authorization,
                 'Content-Type': 'application/json'
             },
            body: JSON.stringify({
                link: link,
                name: place,
              }) 
         })
             .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
     };
    
    deletCard = (id) => {
        return  fetch(this._baseUrl + '/cards/' + id, {
            method: 'DELETE',
             headers: {
                 authorization:  this._authorization,
             }
        })
             .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
     };

    changeAvatar = (link) => {
    return  fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link
        }) 
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    putLike = (id) => {
        return  fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: 'PUT',
            headers: {
                authorization: this._authorization,
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        }

    deletLike = (id) => {
        return  fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        }
        
}