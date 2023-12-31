import React, { useState } from "react";
import Image from "next/image";
import { useCoordinatesStore, useMagnifierStore } from "@/useStore";
function WaldoImage({ src }: { src: string }) {
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
  return (
    <>
      <Image
        src={src}
        alt=""
        width={0}
        height={0}
        sizes="100dvw"
        className="w-full h-auto p-2"
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          magnifierIsUsed && setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
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
        }}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false);
        }}
      />
    </>
  );
}

export default WaldoImage;
