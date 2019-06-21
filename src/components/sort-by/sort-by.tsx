import * as React from 'react';
import {SortType} from '../../types/enums/sort-type';
import withToggle from '../../hocs/with-toggle/with-toggle.jsx';
import withTransformProps from '../../hocs/with-transform-props/with-transform-props.jsx';

interface Props {
  onToggle: () => void;
  isOpen: boolean;
  currentItem: string;
  onPopularClick: () => void;
  onLowToHighClick: () => void;
  onHighToLowClick:() => void;
  onTopRatedClick: () => void;
}

const SortBy: React.FunctionComponent<Props> = (props) => {
  const {
    onToggle,
    isOpen,
    onPopularClick,
    onLowToHighClick,
    onHighToLowClick,
    onTopRatedClick,
    currentItem,
  } = props;

  const SORT_TYPES_LIST = [
    {
      name: SortType.POPULAR,
      action: onPopularClick,
    },
    {
      name: SortType.LOW_TO_HIGH,
      action: onLowToHighClick,
    },
    {
      name: SortType.HIGH_TO_LOW,
      action: onHighToLowClick,
    },
    {
      name: SortType.TOP_RATED,
      action: onTopRatedClick,
    },
  ];

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={onToggle}
    >
      <span className="places__sorting-type" tabIndex={0}>
        <span className="places__sorting-caption">Sort by</span> {currentItem}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      {isOpen &&
        <ul className="places__options places__options--custom places__options--opened">
          {SORT_TYPES_LIST.map((item) =>
            <li
              className={`places__option ${currentItem === item.name ? `places__option--active` : ``}`}
              tabIndex={0}
              onClick={item.action}
              key={item.name}
            >
              {item.name}
            </li>
          )}
        </ul>
      }
    </form>
  );
};

export {SortBy};
export default withToggle(withTransformProps(
    (props) => Object.assign({}, props, {
      isOpen: props.toggleStatus,
    }))(SortBy));
