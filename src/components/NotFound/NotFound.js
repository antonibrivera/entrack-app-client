import React from 'react';
import './NotFound.css';
import TokenServices from '../../services/token-services';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
  userButton() {
    if (TokenServices.hasAuthToken()) return <a href='/dashboard'><button className="user-btn">Go to Dashboard</button></a>
    else return <a href='/'><button className="user-btn">Go Home</button></a>
  }

  render() {
    return (
      <div className="not-found-container">
        <h3>404 Not Found</h3>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        {this.userButton()}
      </div>
    )
  }
}