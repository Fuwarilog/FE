import { useState } from "react";
import { Menu, Navigation, Search } from "lucide-react";
import { Autocomplete } from "@react-google-maps/api";

export default function UnifiedSearchBar({ onPlaceSearch, onRouteMode }) {
  const [input, setInput] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);

  return (
    <div className="absolute top-4 left-4 z-50 w-[300px] pointer-events-auto">
      <div className="flex items-center bg-white shadow rounded-md px-3 py-2 border border-gray-300">
        {/* ☰ 메뉴 버튼 */}
        <button className="p-2">
          <Menu size={20} />
        </button>

        {/* 🔍 Autocomplete 입력창 */}
        <Autocomplete
          onLoad={(auto) => setAutocomplete(auto)}
          onPlaceChanged={() => {
            if (!autocomplete) return;

            const place = autocomplete.getPlace();
            if (!place.geometry) return;

            const location = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              name: place.name,
              address: place.formatted_address,
            };

            onPlaceSearch(location); // 지도 이동 및 InfoCard 렌더링
            setInput(place.formatted_address); // 입력창 반영
          }}
        >
          <input
            type="text"
            placeholder="장소를 검색하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 mx-3 outline-none text-sm"
          />
        </Autocomplete>

        {/* 🔍 검색 아이콘 (기능 제거 또는 선택 전까지 비활성화) */}
        <button className="p-2 text-gray-400 cursor-default" disabled>
          <Search size={18} />
        </button>

        {/* 📍 경로 검색 아이콘 */}
        <button
          className="ml-2 p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full"
          onClick={onRouteMode}
        >
          <Navigation size={16} />
        </button>
      </div>
    </div>
  );
}
