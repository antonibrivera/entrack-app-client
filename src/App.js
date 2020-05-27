import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import CreateTask from './components/CreateTask/CreateTask';
import CreatePresetTask from './components/CreatePresetTask/CreatePresetTask'
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/NotFound/NotFound';
import Settings from './components/Settings/Settings';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <Route path='/' component={NavBar} />
        </header>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/login' component={Login} />
          <Route exact path='/sign-up' component={SignUp} />
          <Route exact path='/settings' component={Settings} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/create-task' component={CreateTask} />
          <Route path='/create-preset' component={CreatePresetTask} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
