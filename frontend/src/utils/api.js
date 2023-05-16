export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _responceProcessing(res) { // обратотка одна на всех))
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка в Api: ${res.status}`); // если ошибка, отклоняем промис
  }

  async getUserInfo() {    //  Запрос инфо о пользователе
    const res = await fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers,
        credentials: 'include'
      });
    return this._responceProcessing(res);
  }

  async editUserInfo(userData) {    //  Редактирование профиля
    const res = await fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about
        })
      });
    return this._responceProcessing(res);
  }

  async editUserAvatar(link) {    //  Редактирование аватара пользователя
    const res = await fetch(`${this._baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link.avatar
        })
      });
    return this._responceProcessing(res);
  }

  async getInitialCards() {    //  запрос карточек
    const res = await fetch(`${this._baseUrl}/cards`,
      {
        headers: this._headers,
        credentials: 'include'
      });
    return this._responceProcessing(res);
  }

  async addNewCard(cardData) {    //  добавление новой карточки
    const res = await fetch(`${this._baseUrl}/cards`,
      {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        })
      });
    return this._responceProcessing(res);
  }

  async deleteCard(cardID) {    //  удаление карточки
    const res = await fetch(`${this._baseUrl}/cards/${cardID}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers
      });
    return this._responceProcessing(res);
  }

  // ЛАЙКИ //
  async changeLikeCardStatus(cardID, isLiked) {
    if (isLiked) {
      const res = await fetch(`${this._baseUrl}/cards/${cardID}/likes`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: this._headers
        });
      return this._responceProcessing(res);
    } else {
      const res = await fetch(`${this._baseUrl}/cards/${cardID}/likes`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: this._headers
        });
      return this._responceProcessing(res);
    }
  }

}

const api = new Api({   // экземпляр класса Api - запросы к серверу
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.mesto-csrf.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
