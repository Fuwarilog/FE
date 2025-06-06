// src/pages/MapPage.jsx
import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import RouteSearchBox from "../components/Map/RouteSearchBox";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 37.5665,
  lng: 126.978,
};

const libraries = ["places"];

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="flex">
        <div className="w-1/4 h-screen">
          <RouteSearchBox onRouteFetched={setDirections} />
        </div>

        <div className="w-3/4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={(mapInstance) => setMap(mapInstance)}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}
