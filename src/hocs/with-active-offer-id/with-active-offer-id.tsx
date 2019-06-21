import * as React from 'react';

interface Props {
  setActiveId: () => void;
  activeOfferId: number;
}

interface State {
  activeOfferId: number;
}

const withActiveOfferId = (Component) => {
  class WithActiveOfferId extends React.PureComponent<Props, State> {
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

  return WithActiveOfferId;
};

export default withActiveOfferId;
