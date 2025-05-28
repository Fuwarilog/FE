// src/components/Map/PlaceSearchMap.jsx
import React, { useState } from "react";
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import { searchMapKeyword, addBookmark } from "../../API/Map";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

const defaultCenter = {
    lat: 37.5665,
    lng: 126.9780,
};

export default function PlaceSearchMap() {
    const [searchInput, setSearchInput] = useState("");
    const [map, setMap] = useState(null);
    const [results, setResults] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleSearch = async () => {
        try {
            const data = await searchMapKeyword(searchInput);
            console.log("검색 결과:", data); // ✅ 여기에 로그 찍어봐
            setResults(data);
            if (data.length > 0) {
                map.panTo({ lat: data[0].latitude, lng: data[0].longitude });
            }
        } catch (error) {
            console.error("장소 검색 실패:", error);
        }
    };


    const handleBookmark = async (place) => {
        try {
            const diaryId = "your-diary-id"; // 나중에 실제 다이어리 ID로 바꾸기
            const today = new Date().toISOString().slice(0, 10);
            const placeData = {
                name: place.name,
                latitude: place.latitude,
                longitude: place.longitude,
            };
            await addBookmark(diaryId, today, placeData);
            alert("북마크에 추가되었습니다.");
        } catch (error) {
            console.error("북마크 실패:", error);
        }
    };

    return (
        <div className="flex">
            <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">
                <h2 className="text-xl font-bold mb-2">장소 검색</h2>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="장소를 입력하세요"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <button
                    onClick={handleSearch}
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    검색
                </button>

                <ul className="mt-4">
                    {results.map((place, idx) => (
                        <li
                            key={idx}
                            className="cursor-pointer hover:bg-gray-200 p-2 border-b"
                            onClick={() => {
                                map.panTo({ lat: place.latitude, lng: place.longitude });
                                setSelectedPlace(place);
                            }}
                        >
                            <strong>{place.name}</strong>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-3/4">
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={defaultCenter}
                        zoom={13}
                        onLoad={(mapInstance) => setMap(mapInstance)}
                    >
                        {results.map((place, idx) => (
                            <Marker
                                key={idx}
                                position={{ lat: place.latitude, lng: place.longitude }}
                                onClick={() => setSelectedPlace(place)}
                            />
                        ))}

                        {selectedPlace && (
                            <InfoWindow
                                position={{
                                    lat: selectedPlace.latitude,
                                    lng: selectedPlace.longitude,
                                }}
                                onCloseClick={() => setSelectedPlace(null)}
                            >
                                <div>
                                    <strong>{selectedPlace.name}</strong>
                                    <br />
                                    <button
                                        onClick={() => handleBookmark(selectedPlace)}
                                        className="mt-1 text-sm text-blue-600 underline"
                                    >
                                        북마크 추가
                                    </button>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
}