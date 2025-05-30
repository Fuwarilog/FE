// src/pages/MapPage.jsx
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { fetchRoute } from "../API/Map";

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
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [autocompleteOrigin, setAutocompleteOrigin] = useState(null);
  const [autocompleteDestination, setAutocompleteDestination] = useState(null);

  const handleLoadOrigin = (autocomplete) => {
    setAutocompleteOrigin(autocomplete);
  };

  const handleLoadDestination = (autocomplete) => {
    setAutocompleteDestination(autocomplete);
  };

  const handlePlaceChanged = () => {
    if (autocompleteOrigin && autocompleteDestination) {
      const originPlace = autocompleteOrigin.getPlace();
      const destinationPlace = autocompleteDestination.getPlace();
      if (originPlace.geometry && destinationPlace.geometry) {
        setOrigin(originPlace.formatted_address);
        setDestination(destinationPlace.formatted_address);
      }
    }
  };

  useEffect(() => {
    if (origin && destination) {
      const today = new Date().toISOString().slice(0, 10);
      fetchRoute(origin, destination, today)
        .then((data) => {
          console.log("Route info:", data);
          // setDirections(data); ← DirectionsRenderer에 맞게 변환 필요
        })
        .catch((err) => console.error("경로 탐색 실패:", err));
    }
  }, [origin, destination]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="flex">
        <div className="w-1/4 h-screen bg-gray-100 p-4">
          <h2 className="font-bold mb-4">경로 검색</h2>
          <Autocomplete onLoad={handleLoadOrigin} onPlaceChanged={handlePlaceChanged}>
            <input
              type="text"
              placeholder="출발지 입력"
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
          </Autocomplete>
          <Autocomplete onLoad={handleLoadDestination} onPlaceChanged={handlePlaceChanged}>
            <input
              type="text"
              placeholder="도착지 입력"
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
          </Autocomplete>
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
