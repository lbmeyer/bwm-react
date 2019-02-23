import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/shared/Header';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { checkAuthState, logout } from './actions/auth';
import ProtectedRoute from './components/shared/auth/ProtectedRoute';
import LoggedInRoute from './components/shared/auth/LoggedInRoute';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(checkAuthState());
  }

  logoutUser() {
    store.dispatch(logout());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header logout={this.logoutUser} />
            <div className="container">
              <Route exact path="/" render={() => <Redirect to="/rentals" />} />
              <Route exact path="/rentals" component={RentalListing} />
              <ProtectedRoute exact path="/rentals/:id" component={RentalDetail} />
              <Route exact path="/login" component={Login} />
              <LoggedInRoute exact path="/register" component={Register} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
