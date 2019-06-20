import React from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentItem: null,
      };

      this._setActiveItem = this._setActiveItem.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (this.props.currentItem !== prevProps.currentItem) {
        this.setState({
          currentItem: this.props.currentItem,
        });
      }
    }

    render() {
      const {currentItem} = this.state;

      return (
        <Component
          {...this.props}
          currentItem={currentItem}
          setActiveItem={this._setActiveItem}
        />
      );
    }

    _setActiveItem(item) {
      this.setState({currentItem: item});
      return item;
    }
  }

  WithActiveItem.propTypes = {
    currentItem: PropTypes.any,
    setActiveItem: PropTypes.func,
  };

  return WithActiveItem;
};

export default withActiveItem;
