import { useMagnifierControllerStore, useMagnifierStore } from "@/useStore";
import React, { useCallback, useEffect, useState } from "react";

function Magnifier({
  src,
}: {
  magnifierSize?: number;
  src: string | undefined;
  zoomLevel?: number;
}) {
  const [[imgWidth, imgHeight]] = useMagnifierStore((state) => [
    state.imageSize,
  ]);
  const [[x, y], setXY] = useMagnifierStore((state) => [state.XY, state.setXY]);
  const [pageX, pageY] = useMagnifierStore((state) => state.pageXY);
  const [clientX, clientY] = useMagnifierStore((state) => state.clientXY);
  const [image] = useMagnifierStore((state) => [state.image]);

  const [showMagnifier] = useMagnifierControllerStore((state) => [
    state.showMagnifier,
  ]);
  const [magnifierSize] = useMagnifierControllerStore((state) => [
    state.magnifierSize,
  ]);
  const [zoomLevel] = useMagnifierControllerStore((state) => [state.zoomLevel]);

  const [[scrollX, scrollY], setScroll] = useState([0, 0]);

  const updateCoordinates = useCallback(
    function () {
      if (image?.current) {
        const { left, top } = image.current.getBoundingClientRect();
        const x = pageX - left - window.scrollX;
        const y = pageY - top - window.scrollY;
        setXY([x, y]);
        setScroll([window.scrollX, window.scrollY]);
      }
    },
    [image, pageX, pageY, setXY]
  );

  // update coordinates on scroll
  useEffect(() => {
    if (image?.current?.parentElement) {
      const scrollerElement = image.current.parentElement;
      scrollerElement.addEventListener("scroll", updateCoordinates);
      return () => {
        scrollerElement.removeEventListener("scroll", updateCoordinates);
      };
    }
  }, [image, updateCoordinates]);

  return (
    <div
      className="absolute bg-white bg-no-repeat border rounded-full pointer-events-none"
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
