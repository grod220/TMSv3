import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import styled from "styled-components";

import MapStyles from "./mapStyles.json";
import CustomMarker from "./marker.png";

const MapStyle = styled.div`
  height: 46rem;
  margin-top: 5rem;
`;

const directionsLink = () => {
  window.open(
    "http://facebook.com",
    "_blank" // <- This is what makes it open in a new window.
  );
//   window.location.href = "http://google.com";
};

const RestaurantMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 28.5394327, lng: -81.2868005 }}
      defaultOptions={{ styles: MapStyles }}
    >
      <Marker
        position={{ lat: 28.5394327, lng: -81.2868005 }}
        icon={CustomMarker}
        onClick={directionsLink}
      />
    </GoogleMap>
  ))
);

class Map extends Component {
  render() {
    return (
      <RestaurantMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyALcryb0lm_s__qtyYX16o1IjdeDrt2NXc&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<MapStyle />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;
