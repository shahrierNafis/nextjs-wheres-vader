import React, { useEffect, useRef } from "react";
import Image from "next/image";
import useUpdateStates from "../hooks/useUpdateStates";
import { useWaldoImageStore } from "@/useStore";
function WaldoImage({ src }: { src: string }) {
  const image = useRef<HTMLImageElement>(null);
  useUpdateStates(image);
  const [setImage] = useWaldoImageStore((state) => [state.setImage]);
  useEffect(() => {
    setImage(image);
  }, [setImage]);

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
