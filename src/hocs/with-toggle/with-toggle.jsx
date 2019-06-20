import React from 'react';
import PropTypes from 'prop-types';

const withToggle = (PassedComponent) => {
  class WithToggle extends React.PureComponent {

    constructor(props) {
      super(props);
      this._onToggle = this._onToggle.bind(this);

      this.state = {
        toggleStatus: false,
      };
    }

    render() {
      return (
        <PassedComponent
          {...this.props}
          onToggle={this._onToggle}
          toggleStatus={this.state.toggleStatus}
        />
      );
    }

    _onToggle() {
      this.setState({
        toggleStatus: !this.state.toggleStatus
      });
    }
  }

  WithToggle.propTypes = {
    toggleStatus: PropTypes.bool,
    onToggle: PropTypes.func,
  };

  return WithToggle;
};

export default withToggle;

