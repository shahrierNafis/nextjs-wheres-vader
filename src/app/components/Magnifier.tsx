import { useCoordinatesStore, useMagnifierStore } from "@/useStore";
import React from "react";

function Magnifier({
  src,
}: {
  magnifierSize?: number;
  src: string;
  zoomLevel?: number;
}) {
  const [[imgWidth, imgHeight]] = useMagnifierStore((state) => [
    state.imageSize,
  ]);

  const [[x, y]] = useCoordinatesStore((state) => [state.XY, state.setXY]);
  const [showMagnifier] = useMagnifierStore((state) => [state.showMagnifier]);

  const [clientX, clientY] = useCoordinatesStore((state) => state.clientXY);

  const [magnifierSize] = useMagnifierStore((state) => [state.magnifierSize]);

  const [zoomLevel] = useMagnifierStore((state) => [state.zoomLevel]);
  return (
    <div
      className="absolute pointer-events-none border bg-white bg-no-repeat rounded-full"
      style={{
        display: showMagnifier ? "" : "none",
        // set size of magnifier
        height: `${magnifierSize}px`,
        width: `${magnifierSize}px`,
        // move element center to cursor pos
        top: `${clientY + scrollY - magnifierSize / 2}px`,
        left: `${clientX + scrollX - magnifierSize / 2}px`,

        backgroundImage: `url('${src}')`,

        //calculate zoomed image size
        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,

        //calculate position of zoomed image.
        backgroundPositionX: `${-x * zoomLevel + magnifierSize / 2}px`,
        backgroundPositionY: `${-y * zoomLevel + magnifierSize / 2}px`,
      }}
    ></div>
  );
}

export default Magnifier;
