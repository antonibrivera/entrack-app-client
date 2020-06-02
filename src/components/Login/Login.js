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

  loginUserWithJwt = (ev) => {
    ev.preventDefault()
    const { username, password } = ev.target
    AuthApiServices.postLogin({ username: username.value, password: password.value })
      .then(res => {
        if (res.error) return this.setState({ error: res.error })
        username.value = ''
        password.value = ''
        TokenServices.saveAuthToken(res.authToken)
        this.setState({ username: '', password: '', error: null })
        this.props.history.push('/dashboard')
      })
      .catch(res => this.setState({ error: res.error }))
  }

  render() {
    const { error } = this.state
    return (
      <section className="login-form-container">
        <header>
          <h1>Login</h1>
          <p>
            To use the demo account, use username <span className="username-span">'demouser' and/or 'demouser2'</span> with password 
            <span className="password-span"> 'demopassword' and/or 'demopassword2'</span>
          </p>
        </header>
        { error && <p className="login-error">{error}</p> }
        <form className="login-form" onSubmit={ev => this.loginUserWithJwt(ev)}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="demouser" onChange={ev => this.setState({ username: ev.target.value })} required></input>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="demopassword" onChange={ev => this.setState({ password: ev.target.value })} required></input>
          <button type="submit">Login</button>
        </form>
      </section>
    );
  }
}