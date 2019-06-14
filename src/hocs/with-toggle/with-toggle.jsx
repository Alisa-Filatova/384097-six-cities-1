import React from 'react';
import PropTypes from 'prop-types';

const withToggle = (PassedComponent) => {
  class WithToggle extends React.PureComponent {
    constructor(props) {
      super(props);
      this.onToggle = this.onToggle.bind(this);

      this.state = {
        toggleStatus: false,
      };
    }

    onToggle() {
      this.setState({
        toggleStatus: !this.state.toggleStatus
      });
    }

    render() {
      return (
        <PassedComponent
          {...this.props}
          onToggle={this.onToggle}
          toggleStatus={this.state.toggleStatus}
        />
      );
    }
  }

  WithToggle.propTypes = {
    toggleStatus: PropTypes.bool,
    onToggle: PropTypes.func,
  };

  return WithToggle;
};

export default withToggle;

