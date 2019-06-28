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

    state: State = {
      activeOfferId: null,
    };

    private handleGetActiveOffer = (offerId) => {
      this.setState((prevState) => ({
        ...prevState,
        activeOfferId: offerId,
      }));
    };

    render() {
      const {activeOfferId} = this.state;

      return (
        <Component
          {...this.props as T}
          activeOfferId={activeOfferId}
          setActiveId={this.handleGetActiveOffer}
        />
      );
    }
  };
}

export default withActiveOfferId;
