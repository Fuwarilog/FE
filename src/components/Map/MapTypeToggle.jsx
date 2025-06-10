// src/components/Map/MapTypeToggle.jsx
import { useState } from "react";
import { Button } from "../ui/button";

export default function MapTypeToggle({ map }) {
  const [type, setType] = useState("roadmap"); // 기본: 지도

  const toggleType = () => {
    const next = type === "roadmap" ? "satellite" : "roadmap";
    setType(next);
    if (map) {
      map.setMapTypeId(next);
    }
  };

  return (
    <div className="absolute bottom-6 left-6 z-50"> 
      <Button
        onClick={toggleType}
        className="!bg-white border !text-black shadow "
      >
        {type === "roadmap" ? "위성" : "지도"}
      </Button>
    </div>
  );
}
