import config from '../config';

const AuthApiServices = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', },
      body: JSON.stringify(credentials)
    })
    .then(res => res.json())
  }
}

export default AuthApiServices