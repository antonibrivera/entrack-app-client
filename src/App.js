import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import CreateTask from './components/CreateTask/CreateTask';
import EditTask from './components/EditTask/EditTask';
import CreatePresetTask from './components/CreatePresetTask/CreatePresetTask'
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/NotFound/NotFound';
import Settings from './components/Settings/Settings';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <Route path='/' component={NavBar} />
        </header>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <PublicOnlyRoute exact path='/login' component={Login} />
          <PublicOnlyRoute exact path='/sign-up' component={SignUp} />
          <PrivateRoute exact path='/settings' component={Settings} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/task/create' component={CreateTask} />
          <PrivateRoute path='/task/edit' component={EditTask} />
          <PrivateRoute path='/preset/create' component={CreatePresetTask} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}