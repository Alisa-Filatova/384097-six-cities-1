import React from 'react';
import PropTypes from 'prop-types';

const withActiveOfferId = (Component) => {
  class WithActiveOfferId extends React.PureComponent {
    constructor(props) {
      super(props);

      const {activeOfferId = null} = props;

      this.state = {
        activeOfferId,
      };

      this._handleGetActiveOffer = this._handleGetActiveOffer.bind(this);
    }

    render() {
      const {activeOfferId} = this.state;

      return (
        <Component
          {...this.props}
          activeOfferId={activeOfferId}
          setActiveId={this._handleGetActiveOffer}
        />
      );
    }

    _handleGetActiveOffer(offerId) {
      this.setState((prevState) => {
        return Object.assign({}, prevState, {activeOfferId: offerId});
      });
    }
  }

  WithActiveOfferId.propTypes = {
    activeOfferId: PropTypes.any,
    setActiveId: PropTypes.func,
  };

  return WithActiveOfferId;
};

export default withActiveOfferId;
