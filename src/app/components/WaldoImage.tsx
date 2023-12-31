import React, { useRef } from "react";
import Image from "next/image";
import useUpdateStates from "../hooks/useUpdateStates";
function WaldoImage({ src }: { src: string }) {
  const image = useRef<HTMLImageElement>(null);
  useUpdateStates(image);
  return (
    <>
      <Image
        ref={image}
        src={src}
        alt=""
        width={0}
        height={0}
        sizes="100dvw"
        className="w-full h-auto p-2"
      />
    </>
  );
}

export default WaldoImage;
