import * as React from 'react';
import {RefObject} from 'react';
import {connect} from 'react-redux';
import {Operation} from '../../reducers/user/user';
import {getUser} from '../../reducers/user/selectors';
import CityTab from '../city-tab/city-tab';
import withRedirectRoute from '../../hocs/with-redirect-route/with-redirect-route';
import {BASE_COLOR, ERROR_COLOR, EMAIL_REGEXP} from '../../constants/constants';
import {User} from '../../types/user';

interface Props {
  onLogin: (User) => void;
  user?: User;
}

class SignIn extends React.PureComponent<Props> {

  emailInput: RefObject<HTMLInputElement> = React.createRef();
  passwordInput: RefObject<HTMLInputElement> = React.createRef();

  private handleValidateFields = () => {
    const email = this.emailInput.current.value;
    const password = this.passwordInput.current.value;

    if (!EMAIL_REGEXP.test(email)) {
      this.emailInput.current.style.borderColor = ERROR_COLOR;
    } else if (!password) {
      this.passwordInput.current.style.borderColor = ERROR_COLOR;
    } else {
      this.emailInput.current.style.borderColor = BASE_COLOR;
      this.passwordInput.current.style.borderColor = BASE_COLOR;
    }
  };

  private handleCheckDataLogin = (event) => {
    event.preventDefault();

    if (this.emailInput && this.passwordInput) {
      const email = this.emailInput.current.value;
      const password = this.passwordInput.current.value;

      if (email && password && EMAIL_REGEXP.test(email)) {
        this.props.onLogin({email, password});
      }
    }
  };

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
                  onChange={this.handleValidateFields}
                  required
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
                  onChange={this.handleValidateFields}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                onClick={this.handleCheckDataLogin}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <CityTab city="Amsterdam" />
          </section>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (user) => {
    dispatch(Operation.login(user));
  },
});

export {SignIn};
export default withRedirectRoute(connect(mapStateToProps, mapDispatchToProps)(SignIn));
