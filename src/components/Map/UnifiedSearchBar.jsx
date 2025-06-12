import { useState, useEffect } from "react";
import { Menu, Navigation, Search } from "lucide-react";
import { Autocomplete } from "@react-google-maps/api";

export default function UnifiedSearchBar({ onPlaceSearch, onRouteMode }) {
  const [input, setInput] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    let animationFrameId;

    const fixPacPosition = () => {
      const pacList = document.querySelectorAll(".pac-container");
      const input = document.getElementById("search-input");

      if (input && pacList.length > 0) {
        const rect = input.getBoundingClientRect();

        pacList.forEach((pac, idx) => {
          if (idx === 0) {
            pac.style.display = input.value.trim() ? "block" : "none";
            pac.style.position = "absolute";
            pac.style.top = `${rect.bottom + window.scrollY + 15}px`;
            pac.style.left = `${rect.left + window.scrollX -78}px`;
            pac.style.width = `${rect.width}px`;
            pac.style.zIndex = "9999";
          } else {
            pac.style.display = "none";
          }
        });
      }

      animationFrameId = requestAnimationFrame(fixPacPosition);
    };

    animationFrameId = requestAnimationFrame(fixPacPosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute top-4 left-4 z-50 w-[300px] pointer-events-auto">
       <div className="flex items-center gap-3 w-full max-w-[500px] font-gangwon text-[18px] bg-white shadow-md rounded-full px-4 py-2 border border-gray-200">
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
              placeId: place.place_id,
              name: place.name,
              address: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };

            onPlaceSearch(location);
            setInput(place.formatted_address);
          }}
        >
          <input
            id="search-input"
            type="text"
            placeholder="장소를 검색하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 mx-3 outline-none text-sm"
          />
        </Autocomplete>

        {/* 🔍 비활성화된 검색 버튼 */}
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
