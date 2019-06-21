import * as React from 'react';

const withTransformProps = (transformFn) => (Component) => {
  const WithTransformProps = (props) => {
    const transformedProps = transformFn(props);
    return <Component {...transformedProps} />;
  };

  return WithTransformProps;
};

export default withTransformProps;
