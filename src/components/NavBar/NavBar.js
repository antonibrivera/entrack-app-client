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
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/" onClick={() => this.handleLogout()}>Logout</Link>
      </nav>
    )
  }

  renderLoggedOutNav() {
    return (
      <nav className="navbar">
        <Link to="/sign-up">Sign Up</Link>
        <Link to="/login">Login</Link>
        <Link to="/">Home</Link>
      </nav>
    )
  }

  render() {
    if (TokenServices.hasAuthToken()) return this.renderLoggedInNav()
    else return this.renderLoggedOutNav()
  }
}