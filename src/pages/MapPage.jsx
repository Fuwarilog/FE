import React, { useEffect, useState } from "react";
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

import { fetchAllDiaries } from "../API/Diary";
import { format } from "date-fns";

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

  const [tags, setTags] = useState([]);
  const [diaryListId, setDiaryListId] = useState(null);

  // 오늘 다이어리 정보 불러오기
  const loadTodayDiary = async () => {
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const result = await fetchAllDiaries();

      for (const trip of result.data) {
        const found = trip.diaries?.find((d) => d.startDate === today);
        if (found) {
          setTags(found.tags ?? []);
          setDiaryListId(found.id);
          break;
        }
      }
    } catch (err) {
      console.error("❌ 다이어리 로딩 실패:", err);
    }
  };
  
  useEffect(() => {
    loadTodayDiary();
  }, []);

  // ✅ 북마크 후 상태 동기화
  const handleBookmarkToggle = async () => {
    await loadTodayDiary(); // ✅ 서버에서 최신 tags와 diaryListId 다시 받아오기
  };


  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="relative w-full h-screen overflow-hidden">
        {/* 🔍 검색 바 */}
        <UnifiedSearchBar
          onPlaceSearch={(place) => {
            console.log("📍 장소 검색 결과:", place);

            if (!place || place.lat == null || place.lng == null) return;

            setSearchedPlace(place);
            setDirections(null);
            map?.panTo({ lat: place.lat, lng: place.lng });
            map?.setZoom(15);
          }}
          onRouteMode={() => {
            console.log("경로 검색 모드 진입");
            setShowRouteBox((prev) => !prev);
          }}
        />

        {/* 📦 경로 검색 패널 */}
        {showRouteBox && (
          <div className="absolute top-0 left-0 z-50 w-1/4 h-full bg-white shadow-xl overflow-y-auto">
            <RouteSearchBox
              map={map}
              onRouteFetched={(result) => {
                setDirections(result);
                setShowRouteBox(false);
              }}
              onClose={() => setShowRouteBox(false)}
            />
          </div>
        )}

        {/* 🗺️ 지도 */}
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
          {/* 📌 장소 마커 */}
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

        {/* 🧾 장소 카드 */}
        {searchedPlace && diaryListId && (
          <InfoCard
            place={searchedPlace}
            diaryListId={diaryListId}
            tags={tags}  
            onBookmark={handleBookmarkToggle}
          />
        )}

        {/* 🛰️ 지도 타입 토글 */}
        {!showRouteBox && <MapTypeToggle map={map} />}
      </div>
    </LoadScript>
  );
}
