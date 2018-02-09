import React from "react";
import Loadable from "react-loadable";

const Loading = props => {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
};

export default componentImport => {
  return Loadable({
    loader: componentImport,
    loading: Loading,
    delay: 300
  });
};
