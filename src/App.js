import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import CreateTask from './components/CreateTask/CreateTask';
import EditTask from './components/EditTask/EditTask';
import EditPresetTask from './components/EditPresetTask/EditPresetTask';
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/NotFound/NotFound';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ErrorHandler>
          <header>
            <Route path='/' component={NavBar} />
          </header>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <PublicOnlyRoute exact path='/login' component={Login} />
            <PublicOnlyRoute exact path='/sign-up' component={SignUp} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/task/create' component={CreateTask} />
            <PrivateRoute path='/task/edit' component={EditTask} />
            <PrivateRoute path='/preset/edit' component={EditPresetTask} />
            <Route component={NotFound} />
          </Switch>
        </ErrorHandler>
      </div>
    );
  }
}