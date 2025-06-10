import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

export default function PlaceSearchBox({ map, onPlaceSelect }) {
  const [autocomplete, setAutocomplete] = useState(null);
  const [input, setInput] = useState("");

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name,
          address: place.formatted_address,
        };

        // 지도 이동
        map.panTo(location);
        map.setZoom(15);

        // 상위 컴포넌트에 전달
        onPlaceSelect(location);
      }
    }
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-[300px]">
      <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
        <input
          type="text"
          placeholder="장소를 검색하세요"
          className="w-full p-2 border border-gray-300 rounded-md shadow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Autocomplete>
    </div>
  );
}
