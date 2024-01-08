import { useMagnifierControllerStore } from "@/useStore";
import React, { useEffect, useState } from "react";

function MagnifierControl() {
  const [RatioString, setRatioString] = useState("");

  const [magnifierIsUsed, setMagnifierIsUsed] = useMagnifierControllerStore(
    (state) => [state.magnifierIsUsed, state.setMagnifierIsUsed]
  );
  const [magnifierSize, setMagnifierSize] = useMagnifierControllerStore(
    (state) => [state.magnifierSize, state.setMagnifierSize]
  );
  const [zoomLevel, setZoomLevel] = useMagnifierControllerStore((state) => [
    state.zoomLevel,
    state.setZoomLevel,
  ]);

  useEffect(() => {
    const magnifierSize = innerWidth / 3;
    setMagnifierSize(magnifierSize);
    setRatioString(`1/${innerWidth / magnifierSize}`);
  }, [setMagnifierSize]);

  function handleSizeChange() {
    if (typeof window !== "undefined") {
      const ratio = innerWidth / magnifierSize;
      if (ratio != 5) {
        setMagnifierSize(innerWidth / (ratio + 1));
      } else {
        setMagnifierSize(innerWidth / 2);
      }
    }
  }
  function handleZoomLevelChange() {
    if (zoomLevel != 3) {
      setZoomLevel(zoomLevel + 0.5);
    } else {
      setZoomLevel(1.5);
    }
  }
  function getMagnifierSizeRatio() {
    if (typeof window !== "undefined") {
      return `1/${innerWidth / magnifierSize}`;
    }
  }
  return (
    <>
      <div className="p-0 m-2 border rounded shadow max-w-fit">
        <button
          className="p-2 border rounded shadow max-w-fit "
          onClick={() => setMagnifierIsUsed(!magnifierIsUsed)}
        >
          magnifier:{magnifierIsUsed ? "on" : "off"}
        </button>
        <button
          className="p-2 border rounded shadow max-w-fit "
          onClick={handleSizeChange}
        >
          size:{RatioString}
        </button>
        <button
          className="p-2 border rounded shadow max-w-fit "
          onClick={handleZoomLevelChange}
        >
          zoom:{zoomLevel}
        </button>
      </div>
    </>
  );
}

export default MagnifierControl;
