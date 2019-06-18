import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation} from '../../reducers/user/user';
import {getUser} from '../../reducers/user/selectors';

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this._emailInput = React.createRef();
    this._passwordInput = React.createRef();
    this._handleCheckDataLogin = this._handleCheckDataLogin.bind(this);
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
                  ref={this._emailInput}
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
                  ref={this._passwordInput}
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
                onClick={this._handleCheckDataLogin}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  _handleCheckDataLogin(event) {
    event.preventDefault();

    if (this._emailInput && this._passwordInput) {
      const [email, password] = [this._emailInput.current.value, this._passwordInput.current.value];
      if (email && password) {
        this.props.login({email, password});
      }
    }
  }
}

SignIn.propTypes = {
  login: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    [`avatar_url`]: PropTypes.string,
    [`is_pro`]: PropTypes.bool,
  }),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => {
    dispatch(Operation.login(data));
  },
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
