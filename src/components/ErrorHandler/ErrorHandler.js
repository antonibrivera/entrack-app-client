import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorHandler extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError === true) return (
      <div>
        <h2>There has been an error. Try again.</h2>
        <Link to='/dashboard'>
          <button>Go Home</button>
        </Link>
      </div>
    )
    return this.props.children
  }
}