import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Button } from "../ui/button";
import RouteSummaryCard from "../Cards/RouteSummaryCard";

export default function RouteSearchBox({ map , onClose }) {
    const [autocompleteOrigin, setAutocompleteOrigin] = useState(null);
    const [autocompleteDestination, setAutocompleteDestination] = useState(null);
    const [directions, setDirections] = useState(null);

    const handleSearchRoute = async () => {
    if (!autocompleteOrigin || !autocompleteDestination) {
      alert("출발지와 도착지를 모두 선택해주세요.");
      return;
    }

    const originPlace = autocompleteOrigin.getPlace();
    const destinationPlace = autocompleteDestination.getPlace();

    if (!originPlace?.geometry || !destinationPlace?.geometry) {
      alert("위치 정보가 부족합니다.");
      return;
    }

    const origin = originPlace.geometry.location;
    const destination = destinationPlace.geometry.location;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.TRANSIT,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result); // ✅ 내부에 저장
          if (map) {
            map.panTo(destination);
            map.setZoom(14);
          }
        } else {
          alert("경로를 가져오는 데 실패했습니다.");
        }
      }
    );
  };

  return (
    <div className="w-full h-full bg-white p-4 rounded shadow">
     <div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-bold">경로 검색</h2>
  <button
    onClick={onClose}
    className="text-gray-500 hover:text-black text-xl leading-none"
  >
    ✕
  </button>
</div>

      <Autocomplete onLoad={setAutocompleteOrigin}>
        <input
          type="text"
          placeholder="출발지 입력"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
      </Autocomplete>
      <Autocomplete onLoad={setAutocompleteDestination}>
        <input
          type="text"
          placeholder="도착지 입력"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
      </Autocomplete>
      <Button
        onClick={handleSearchRoute}
        className="mt-4 w-full text-base font-semibold"
      >
        경로 검색
      </Button>

      {/* ✅ 결과 표시 */}
      {directions && (
        <div className="mt-4">
          <RouteSummaryCard directions={directions} />
        </div>
      )}
    </div>
  );
}
