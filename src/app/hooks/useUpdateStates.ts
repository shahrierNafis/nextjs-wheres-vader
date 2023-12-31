import { useCoordinatesStore, useMagnifierStore } from "@/useStore";
import React, { useEffect } from "react";

function useUpdateCoordinates(image: React.RefObject<HTMLImageElement>) {
  const [setSize] = useMagnifierStore((state) => [state.setImageSize]);
  const [setXY] = useCoordinatesStore((state) => [state.setXY]);
  const [setXYpercent] = useCoordinatesStore((state) => [state.setXYpercent]);
  const [setClientXY] = useCoordinatesStore((state) => [state.setClientXY]);
  const [magnifierIsUsed] = useMagnifierStore((state) => [
    state.magnifierIsUsed,
  ]);
  const [setShowMagnifier] = useMagnifierStore((state) => [
    state.setShowMagnifier,
  ]);

  useEffect(() => {
    function onMouseEnter(e: MouseEvent) {
      // update image size and turn-on magnifier
      const elem = e.currentTarget;
      const { width, height } = (
        elem as HTMLImageElement
      ).getBoundingClientRect();
      setSize([width, height]);
      magnifierIsUsed && setShowMagnifier(true);
    }

    function onMouseMove(e: MouseEvent) {
      // image position relative to the viewport
      const { left, top, width, height } = (
        e.target as HTMLImageElement
      ).getBoundingClientRect();

      const { pageX, pageY } = e;

      // cursor position relative to the image
      const x = pageX - left - scrollX;
      const y = pageY - top - scrollY;
      setXY([x, y]);
      // cursor position relative to the image (percentage)
      const percentX = Math.round(((pageX - left - scrollX) / width) * 100);
      const percentY = Math.round(((pageY - top - scrollY) / height) * 100);
      setXYpercent([percentX, percentY]);

      // cursor position relative to the viewport
      const { clientX, clientY } = e;
      setClientXY([clientX, clientY]);
    }
    const onMouseLeave = () => {
      // close magnifier
      setShowMagnifier(false);
    };

    image.current?.addEventListener("mouseenter", onMouseEnter);
    image.current?.addEventListener("mousemove", onMouseMove);
    image.current?.addEventListener("mouseleave", onMouseLeave);
    return () => {};
  }, [
    image,
    magnifierIsUsed,
    setClientXY,
    setShowMagnifier,
    setSize,
    setXY,
    setXYpercent,
  ]);
}

export default useUpdateCoordinates;
