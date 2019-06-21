import * as React from 'react';
import {Subtract} from 'utility-types';

interface InjectedProps {
  setActiveItem: (item: any) => void;
}

interface State {
  currentItem: any;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  return class WithActiveItem extends React.PureComponent<T, State> {

    constructor(props) {
      super(props);

      this.state = {currentItem: null};
      this.setActiveItemHandle = this.setActiveItemHandle.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          currentItem={this.state.currentItem}
          setActiveItem={this.setActiveItemHandle}
        />
      );
    }

    private setActiveItemHandle(item) {
      this.setState({currentItem: item});
    }
  };
};

export default withActiveItem;
