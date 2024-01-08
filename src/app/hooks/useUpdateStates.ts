import {
  useMagnifierControllerStore,
  useDropdownStore,
  useMagnifierStore,
} from "@/useStore";
import React, { useEffect } from "react";

function useUpdateCoordinates(
  image: React.RefObject<HTMLImageElement> | null,
  src: string | undefined
) {
  const [setSize] = useMagnifierStore((state) => [state.setImageSize]);
  const [setXY] = useMagnifierStore((state) => [state.setXY]);
  const [setXYpercent] = useMagnifierStore((state) => [state.setXYpercent]);
  const [setClientXY] = useMagnifierStore((state) => [state.setClientXY]);
  const [setPageXY] = useMagnifierStore((state) => [state.setPageXY]);
  const [magnifierIsUsed] = useMagnifierControllerStore((state) => [
    state.magnifierIsUsed,
  ]);
  const [setShowMagnifier] = useMagnifierControllerStore((state) => [
    state.setShowMagnifier,
  ]);
  const [setShowDropdown] = useDropdownStore((state) => [
    state.setShowDropdown,
  ]);

  useEffect(() => {
    if (!image) {
      return;
    }
    const imageRef = image.current;

    function onClick(e: MouseEvent) {
      setShowDropdown(true);
    }
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
      setPageXY([pageX, pageY]);

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

    imageRef?.addEventListener("mouseenter", onMouseEnter);
    imageRef?.addEventListener("mousemove", onMouseMove);
    imageRef?.addEventListener("mouseleave", onMouseLeave);
    imageRef?.addEventListener("click", onClick);

    return () => {
      imageRef?.removeEventListener("mouseenter", onMouseEnter);
      imageRef?.removeEventListener("mousemove", onMouseMove);
      imageRef?.removeEventListener("mouseleave", onMouseLeave);
      imageRef?.removeEventListener("click", onClick);
    };
  }, [
    src,
    image,
    magnifierIsUsed,
    setClientXY,
    setPageXY,
    setShowDropdown,
    setShowMagnifier,
    setSize,
    setXY,
    setXYpercent,
  ]);
}

export default useUpdateCoordinates;
