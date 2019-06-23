import * as React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../constants/constants';

const logoSize = {
  DEFAULT: {
    width: 81,
    height: 41,
  },
  SMALL: {
    width: 64,
    height: 33,
  },
};

interface Props {
  prefix?: string;
  small?: boolean;
}

const AppLogo: React.FunctionComponent<Props> = ({prefix = `header`, small}) => (
  <Link
    className={`${prefix}__logo-link`}
    to={ROUTES.HOME}
  >
    <img
      className={`${prefix}__logo`}
      src="/img/logo.svg"
      alt="6 cities logo"
      width={small ? logoSize.SMALL.width : logoSize.DEFAULT.width}
      height={small ? logoSize.SMALL.height : logoSize.DEFAULT.height}
    />
  </Link>
);

export default AppLogo;
