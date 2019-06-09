import React from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.Component {
    constructor(props) {
      super(props);

      const {currentItem = null} = props;
      this.state = {
        currentItem,
      };
    }

    render() {
      const {currentItem} = this.state;
      const {setActiveItem} = this.props;
      return <Component
        {...this.props}
        currentItem={currentItem}
        setActiveItem={(item) => {
          setActiveItem(item);
          this.setState({
            currentItem: item,
          });
        }}
      />;
    }

    componentDidUpdate(prevProps) {
      if (this.props.currentItem !== prevProps.currentItem) {
        this.setState({
          currentItem: this.props.currentItem,
        });
      }
    }
  }

  WithActiveItem.propTypes = {
    currentItem: PropTypes.any,
    setActiveItem: PropTypes.func,
  };

  return WithActiveItem;
};

export default withActiveItem;
