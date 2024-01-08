import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useUpdateStates from "../hooks/useUpdateStates";
import { useMagnifierStore } from "@/useStore";
function WaldoImage({ src }: { src: string | undefined }) {
  const image = useRef<HTMLImageElement | null>(null);
  useUpdateStates(image, src);

  const [setImage] = useMagnifierStore((state) => [state.setImage]);
  useEffect(() => {
    setImage(image);
  }, [image, setImage]);

  return (
    <>
      {src && (
        <Image
          ref={image}
          src={src}
          alt=""
          width={0}
          height={0}
          sizes="100dvw"
          className="w-full h-auto p-2"
        />
      )}
    </>
  );
}

export default WaldoImage;
