import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';

class Login extends Component {
  loginUser = userData => {
    this.props.dispatch(login(userData));
  };

  render() {
    const { isAuth, errors } = this.props.auth;
    // if this.props.location.state is undefined (we didn't arrive on page)
    // from register.js, we assign successRegister = false
    const { successRegister } = this.props.location.state || false;

    if (isAuth) {
      return <Redirect to={{ pathname: '/rentals' }} />;
    }

    return (
      <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              {
                successRegister && 
                  <div className="alert alert-success">
                    <p>You have successfully registered. Please login now.</p>
                  </div>
              }
              <LoginForm submitCb={this.loginUser} errors={errors} />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Login);
