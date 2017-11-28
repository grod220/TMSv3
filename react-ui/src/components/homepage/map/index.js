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
    "https://www.google.de/maps/place/The+Meatball+Stoppe/@28.5323983,-81.3232052,12.69z/data=!4m5!3m4!1s0x88e765ae727e7509:0x276197e7b025a43e!8m2!3d28.5394622!4d-81.2868018?hl=en",
    "_blank"
  );
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
