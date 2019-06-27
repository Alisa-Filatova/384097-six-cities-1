import * as React from 'react';
import {ComponentType} from 'react';
import {Subtract} from 'utility-types';

interface Props {
  setActiveId: (offerId: number | string) => void;
}

interface State {
  activeOfferId: number;
}

function withActiveOfferId<T extends Props>(Component: ComponentType<T>) {
  return class WithActiveOfferId extends React.PureComponent<Subtract<T, Props>, State> {

    constructor(props) {
      super(props);

      const {activeOfferId = null} = props;

      this.state = {activeOfferId};
      this._handleGetActiveOffer = this._handleGetActiveOffer.bind(this);
    }

    render() {
      const {activeOfferId} = this.state;

      return (
        <Component
          {...this.props as T}
          activeOfferId={activeOfferId}
          setActiveId={this._handleGetActiveOffer}
        />
      );
    }

    private _handleGetActiveOffer(offerId) {
      this.setState((prevState) => ({
        ...prevState,
        activeOfferId: offerId,
      }));
    }
  };
}

export default withActiveOfferId;
