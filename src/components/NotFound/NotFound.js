import React from 'react';
import './NotFound.css';
import TokenServices from '../../services/token-services';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
  userButton() {
    if (TokenServices.hasAuthToken()) return <Link to='/dashboard'><button className="user-btn">Go to Dashboard</button></Link>
    else return <Link to='/'><button className="user-btn">Go Home</button></Link>
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