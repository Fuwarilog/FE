import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";

import InfoCard from "../components/Cards/InfoCard";
import MapTypeToggle from "../components/Map/MapTypeToggle";
import UnifiedSearchBar from "../components/Map/UnifiedSearchBar";
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
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [directions, setDirections] = useState(null);
  const [showRouteBox, setShowRouteBox] = useState(false);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="relative w-full h-screen overflow-hidden">
        {/* 📍 상단 검색 바 */}
        <UnifiedSearchBar
          onPlaceSearch={(place) => {
            console.log("📍 장소 검색 결과:", place);

            if (!place || place.lat == null || place.lng == null) return;

            setSearchedPlace(place);
            setDirections(null);
            map?.panTo({ lat: place.lat, lng: place.lng, });
            map?.setZoom(15);
          }}
          onRouteMode={() => {
            console.log("경로 검색 모드 진입");
            setShowRouteBox((prev) => !prev);
          }}
        />

        {/* 📦 경로 검색 패널 (지도 위 좌측 오버레이) */}
        {showRouteBox && (
          <div className="absolute top-0 left-0 z-50 w-1/4 h-full bg-white shadow-xl overflow-y-auto">
            <RouteSearchBox
              map={map}
              onRouteFetched={(result) => {
                setDirections(result);
                setShowRouteBox(false); // 경로 검색 후 닫기
              }}
              onClose={() => setShowRouteBox(false)} // ✕ 닫기 버튼 처리
            />
          </div>
        )}

        {/* 🗺️ 지도 전체 100% */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={(mapInstance) => setMap(mapInstance)}
          options={{
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            panControl: false,
            rotateControl: false,
            scaleControl: false,
          }}
        >
          {/* 📌 마커 */}
          {searchedPlace && (
            <Marker
              position={{
                lat: searchedPlace.lat,
                lng: searchedPlace.lng,
              }}
            />
          )}

          {/* 🔁 경로 렌더링 */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>

        {/* 🧾 장소 정보 카드 */}
        {searchedPlace && (
          <InfoCard
            place={searchedPlace}
            onBookmark={() => console.log("북마크 기능")}
          />
        )}

        {/* 🛰️ 지도 타입 전환 버튼 */}
        {!showRouteBox && <MapTypeToggle map={map} />}
      </div>
    </LoadScript>
  );
}