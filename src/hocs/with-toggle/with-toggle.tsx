import * as React from 'react';
import {Subtract} from 'utility-types';

interface InjectedProps {
  onToggle: () => void;
  toggleStatus: boolean;
}

interface State {
  toggleStatus: boolean;
}

const withToggle = (Component) => {
  // Получаем пропсы переданного компонента
  type P = React.ComponentProps<typeof Component>;

  // Вычисляем реальные пропсы, которые нужно передать снаружи в обернутый компонент.
  // P - пропсы компонента, InjectedProps - добавляемые хоком пропсы.
  // T - пропсы, которые нужно передать в обернутый хоком компонент.
  // Условно: T = P - InjectedProps
  // Например: P = {foo: string, bar: string}, InjectedProps = {bar: string}
  // Тогда: T = {foo: string}
  type T = Subtract<P, InjectedProps>;

  return class WithToggle extends React.PureComponent<T, State> {

    state: State = {
      toggleStatus: false,
    };

    private handleToggle = () => {
      this.setState({
        toggleStatus: !this.state.toggleStatus,
      });
    };

    render() {
      return (
        <Component
          {...this.props}
          onToggle={this.handleToggle}
          toggleStatus={this.state.toggleStatus}
        />
      );
    }
  };
};

export default withToggle;

