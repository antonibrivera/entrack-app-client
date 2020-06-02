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
          <p>
            Currently there is no option to sign up for a new account. Use a <a href='/login'>demo account</a> instead!
          </p>
        </header>
        <form className="signup-form" onSubmit={ev => this.loginUser(ev)}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Type here..." onChange={e => this.setState({ username: e.target.value })} required></input>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Type here..." onChange={e => this.setState({ password: e.target.value })} required></input>
          <button type="submit" disabled={true}>Login</button>
        </form>
      </section>
    );
  }
}