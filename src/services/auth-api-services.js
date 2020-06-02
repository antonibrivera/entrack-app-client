import config from '../config';
import TokenServices from './token-services';

const AuthApiServices = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
  },
  getUsersNames() {
    return fetch(`${config.API_ENDPOINT}/auth/user`, {
      headers: { 'Authorization': `bearer ${TokenServices.getAuthToken()}` }
    })
      .then(res => res.json())
  }
}

export default AuthApiServices