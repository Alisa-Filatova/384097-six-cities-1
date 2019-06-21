import * as React from 'react';

interface Props {
  onToggle: () => void;
  toggleStatus: boolean;
}

interface State {
  toggleStatus: boolean;
}

const withToggle = (PassedComponent) => {
  class WithToggle extends React.PureComponent<Props, State> {

    constructor(props) {
      super(props);

      this.handleToggle = this.handleToggle.bind(this);

      this.state = {toggleStatus: false};
    }

    render() {
      return (
        <PassedComponent
          {...this.props}
          onToggle={this.handleToggle}
          toggleStatus={this.state.toggleStatus}
        />
      );
    }

    private handleToggle() {
      this.setState({
        toggleStatus: !this.state.toggleStatus
      });
    }
  }

  return WithToggle;
};

export default withToggle;

