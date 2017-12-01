import React from "react";
import styled from "styled-components"
import {media} from "../../../../sharedUtilities/media"
import PropTypes from "prop-types"


const Clipping = ({name, image, linkTo, text}) => (
    <div>
        {name}
        {text}    
    </div>
);

Clipping.propTypes = {}

export default Clipping;
