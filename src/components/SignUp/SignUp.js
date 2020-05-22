import React from 'react';
import './SignUp.css';

export default class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  signupUser = (ev) => {
    ev.preventDefault()
    console.log(this.state.username, this.state.password)
  }

  render() {
    return (
      <section className="signup-form-container">
        <header>
          <h1>Sign up for an Account</h1>
        </header>
        <form className="signup-form" onSubmit={ev => this.loginUser(ev)}>
          <label htmlFor="username"></label>
          <input type="text" name="username" id="username" placeholder="Username..." onChange={e => this.setState({ username: e.target.value })} required></input>
          <label htmlFor="password"></label>
          <input type="password" name="password" id="password" placeholder="Password..." onChange={e => this.setState({ password: e.target.value })} required></input>
          <button type="submit">Login</button>
        </form>
      </section>
    );
  }
}