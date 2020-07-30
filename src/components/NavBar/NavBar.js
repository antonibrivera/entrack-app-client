import React from 'react';
import TokenServices from '../../services/token-services';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default class NavBar extends React.Component {
  handleLogout() {
    TokenServices.clearAuthToken(() => {
      this.props.history.push('/')
    });
  }

  renderLoggedInNav() {
    return (
      <nav className="navbar">
        <a href="/dashboard">Dashboard</a>
        <a href="/" onClick={() => this.handleLogout()}>Logout</a>
      </nav>
    )
  }

  renderLoggedOutNav() {
    return (
      <nav className="navbar">
        <a href="/sign-up">Sign Up</a>
        <a href="/login">Login</a>
        <a href="/">Home</a>
      </nav>
    )
  }

  render() {
    if (TokenServices.hasAuthToken()) return this.renderLoggedInNav()
    else return this.renderLoggedOutNav()
  }
}