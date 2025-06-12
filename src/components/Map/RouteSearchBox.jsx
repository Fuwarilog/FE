import React, { useState } from "react";
import { Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { Button } from "../ui/button";
import RouteSummaryCard from "../Cards/RouteSummaryCard";

export default function RouteSearchBox({ map, onClose, onRouteFetched }) {
  const [autocompleteOrigin, setAutocompleteOrigin] = useState(null);
  const [autocompleteDestination, setAutocompleteDestination] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [directionsResult, setDirectionsResult] = useState(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

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
        provideRouteAlternatives: true,
      },
      (result, status) => {
        if (status === "OK") {
          setDirectionsResult(result);
          setRoutes(result.routes);
          setSelectedRouteIndex(0);

          // ✅ 부모 컴포넌트로 전달
          if (onRouteFetched) onRouteFetched(result, 0);

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
    <div className="flex h-full font-gangwon">
      {/* 왼쪽 경로 카드 리스트 */}
      <div className="w-[350px] bg-white p-4 overflow-y-auto border-r">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[22px] font-bold">경로 검색</h2>
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
            className="w-full mb-2 p-2 border border-gray-300 rounded font-gangwon"
          />
        </Autocomplete>
        <Autocomplete onLoad={setAutocompleteDestination}>
          <input
            type="text"
            placeholder="도착지 입력"
            className="w-full mb-4 p-2 border border-gray-300 rounded font-gangwon"
          />
        </Autocomplete>

        <Button
          onClick={handleSearchRoute}
          className="mb-4 w-full text-base font-semibold font-gangwon !bg-sky-100 !text-gray-700"
        >
          경로 검색
        </Button>

        {/* 경로 카드 목록 */}
        {routes.map((route, index) => (
          <RouteSummaryCard
            key={index}
            route={route}
            onClick={() => {
              setSelectedRouteIndex(index);
              if (onRouteFetched) onRouteFetched(directionsResult, index); // ✅ 선택 시 하이라이트 반영
            }}
            isSelected={index === selectedRouteIndex}
          />
        ))}
      </div>

      {/* 오른쪽 지도 하이라이트 영역 (내부 테스트용만 표시) */}
      <div className="flex-1 relative hidden">
        {directionsResult && (
          <DirectionsRenderer
            directions={directionsResult}
            routeIndex={selectedRouteIndex}
          />
        )}
      </div>
    </div>
  );
}
