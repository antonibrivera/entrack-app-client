import React from 'react';
import './Login.css';
import AuthApiServices from '../../services/auth-api-services';
import TokenServices from '../../services/token-services';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: null
  }

  loginUser = (ev) => {
    ev.preventDefault()
    const { username, password } = ev.target
    AuthApiServices.postLogin({ username: username.value, password: password.value })
      .then(res => {
        console.log(res)
        username.value = ''
        password.value = ''
        TokenServices.saveAuthToken(res.auth_token)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return (
      <section className="login-form-container">
        <header>
          <h1>Login to my Account</h1>
        </header>
        <form className="login-form" onSubmit={ev => this.loginUser(ev)}>
          <label htmlFor="username"></label>
          <input type="text" name="username" id="username" placeholder="demouser" onChange={ev => this.setState({ username: ev.target.value })} required></input>
          <label htmlFor="password"></label>
          <input type="password" name="password" id="password" placeholder="demopassword" onChange={ev => this.setState({ password: ev.target.value })} required></input>
          <button type="submit">Login</button>
        </form>
      </section>
    );
  }
}