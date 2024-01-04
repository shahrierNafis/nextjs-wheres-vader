import { useMagnifierStore } from "@/useStore";
import React from "react";

function MagnifierControl() {
  useMagnifierStore;
  const [magnifierIsUsed, setMagnifierIsUsed] = useMagnifierStore((state) => [
    state.magnifierIsUsed,
    state.setMagnifierIsUsed,
  ]);
  const [magnifierSize, setMagnifierSize] = useMagnifierStore((state) => [
    state.magnifierSize,
    state.setMagnifierSize,
  ]);
  const [zoomLevel, setZoomLevel] = useMagnifierStore((state) => [
    state.zoomLevel,
    state.setZoomLevel,
  ]);
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
      <div className="border shadow rounded m-2 p-0 max-w-fit">
        <button
          className="border shadow rounded max-w-fit p-2 "
          onClick={() => setMagnifierIsUsed(!magnifierIsUsed)}
        >
          magnifier:{magnifierIsUsed ? "on" : "off"}
        </button>
        <button
          className="border shadow rounded max-w-fit p-2 "
          onClick={handleSizeChange}
        >
          size:{getMagnifierSizeRatio()}
        </button>
        <button
          className="border shadow rounded max-w-fit p-2 "
          onClick={handleZoomLevelChange}
        >
          zoom:{zoomLevel}
        </button>
      </div>
    </>
  );
}

export default MagnifierControl;
