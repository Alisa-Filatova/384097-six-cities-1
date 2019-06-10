import React from 'react';
import PropTypes from 'prop-types';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.handleCheckDataSignIn = this.handleCheckDataSignIn.bind(this);
  }

  handleCheckDataSignIn(email, password) {
    if (email && password) {
      this.props.signIn({email, password});
    }
  }

  render() {
    return (
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={this.emailInput}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={this.passwordInput}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  if (this.emailInput && this.passwordInput) {
                    this.handleCheckDataSignIn(this.emailInput.current.value, this.passwordInput.current.value);
                  }
                }}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>

    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func,
};

export default SignIn;
