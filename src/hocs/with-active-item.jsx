import React from 'react';

const withActiveItem = (WrappedComponent, item = null) => (
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {currentItem: item};
      this._setActiveItem = this._setActiveItem.bind(this);
    }

    componentWillUnmount() {
      this.setState({
        currentItem: null,
      });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          currentItem={this.state.currentItem}
          setActiveItem={this._setActiveItem}
        />
      );
    }

    _setActiveItem(it) {
      this.setState({currentItem: it});
    }
  }
);

export default withActiveItem;
