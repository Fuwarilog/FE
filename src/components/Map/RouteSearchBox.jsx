import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Button } from "../ui/button";

export default function RouteSearchBox({ onRouteFetched }) {
    const [autocompleteOrigin, setAutocompleteOrigin] = useState(null);
    const [autocompleteDestination, setAutocompleteDestination] = useState(null);

    const handleLoadOrigin = (autocomplete) => {
        setAutocompleteOrigin(autocomplete);
    };

    const handleLoadDestination = (autocomplete) => {
        setAutocompleteDestination(autocomplete);
    };

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
        
        console.log("출발지 좌표:", origin.lat(), origin.lng());
        console.log("도착지 좌표:", destination.lat(), destination.lng());

        console.log("📦 Google Directions API 요청", {
            origin,
            destination,
        });

        // ✅ Google Directions API 직접 호출
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.TRANSIT,
            },
            (result, status) => {
                if (status === "OK") {
                    console.log("✅ 경로 응답:", result);
                    onRouteFetched(result); // DirectionsRenderer에 그대로 사용 가능
                } else {
                    console.error("❌ Google Directions API 오류:", status);
                    alert("경로를 가져오는 데 실패했습니다.");
                }
            }
        );
    };

    return (
        <div className="w-full h-full bg-gray-100 p-4">
            <h2 className="font-bold mb-4">경로 검색</h2>
            <Autocomplete onLoad={handleLoadOrigin}>
                <input
                    type="text"
                    placeholder="출발지 입력"
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
            </Autocomplete>
            <Autocomplete onLoad={handleLoadDestination}>
                <input
                    type="text"
                    placeholder="도착지 입력"
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
            </Autocomplete>
            <Button
                onClick={handleSearchRoute}
                className="mt-4 w-full text-base font-semibold !bg-white !text-black"
            >
                경로 검색
            </Button>
        </div>
    );
}
