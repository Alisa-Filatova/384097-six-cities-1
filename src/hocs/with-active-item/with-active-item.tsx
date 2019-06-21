import * as React from 'react';

interface Props {
  currentItem?: any;
  setActiveItem: () => void;
}

interface State {
  currentItem: any;
}

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent<Props, State> {

    constructor(props) {
      super(props);

      this.state = {
        currentItem: null,
      };

      this.setActiveItem = this.setActiveItem.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (this.props.currentItem !== prevProps.currentItem) {
        this.setState({
          currentItem: this.props.currentItem,
        });
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          currentItem={this.state.currentItem}
          setActiveItem={this.setActiveItem}
        />
      );
    }

    private setActiveItem(item) {
      this.setState({currentItem: item});
      return item;
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
