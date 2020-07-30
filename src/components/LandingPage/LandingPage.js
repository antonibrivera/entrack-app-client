import React from 'react';
import './LandingPage.css';

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-container">
        <main className="hero-main">
          <header>
            <h1>EnTrack</h1>
            <p>Take control of your time</p>
          </header>
          <a href='/login'>
            <button className="login-btn">Login</button>
          </a>
        </main>
        <section className="who-are-we-section">
          <header>
            <h2>Who are we?</h2>
          </header>
          <p>
            We want to help you as an independant business owner keep track of your
            work hours, so you can find the right balance of time. Create and manage your tasks with the amount of time it takes
            to complete them and take control of your time.
          </p>
        </section>
        <section className="try-out-section">
          <header>
            <h2>Want to give us a go?</h2>
            <p>Click the demo button below and follow the instructions on the page to sign in.</p>
          </header>
          <a href='/login'>
            <button className="demo-btn">Start Demo</button>
          </a>
        </section>
        <footer>
          <h3>Made with <span role="img" aria-label="heart emoji">❤️</span> in Miami</h3>
        </footer>
      </div>
    )
  }
}