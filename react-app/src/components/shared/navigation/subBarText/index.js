import React from "react";
import PropTypes from "prop-types";

const SubBarText = ({ className }) => {
  return (
    <div className={className}>
      <span>
        <a
          href="https://goo.gl/maps/eb4QHbvh3z42"
          target="_blank"
          rel="noopener noreferrer"
        >
          7325 Lake Underhill Road
        </a>
      </span>
      <span>407-270-6505</span>
    </div>
  );
};

SubBarText.propTypes = {
  className: PropTypes.string.isRequired
};

export default SubBarText;
