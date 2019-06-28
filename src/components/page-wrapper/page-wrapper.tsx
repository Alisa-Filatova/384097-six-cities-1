import * as React from 'react';
import {ROUTES} from '../../constants/constants';

interface Props {
  children: React.ReactNode;
  location: {};
}

const getPageClassName = (page) => {
  switch (page) {
    case ROUTES.HOME:
      return 'page page--gray page--main';

    case ROUTES.LOGIN:
      return 'page page--gray page--login';

    default:
      return 'page';
  }
};

const PageWrapper: React.FunctionComponent<Props> = ({location, children}) => (
  <div className={getPageClassName(location)}>{children}</div>
);

export default PageWrapper;
