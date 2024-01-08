import React, { SetStateAction, useEffect } from "react";
import start from "../serverActions/start";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMagnifierControllerStore } from "@/useStore";
import ParticleEffect from "./ParticleEffect";

function Start({
  setToken,
  setImgBlob,
}: {
  setToken: React.Dispatch<SetStateAction<string>>;
  setImgBlob: React.Dispatch<SetStateAction<Blob | undefined>>;
}) {
  const [didPressStart, setDidPressStart] = React.useState(false);
  const [tokenLoading, setTokenLoading] = React.useState(false);
  const [imgLoading, setImgLoading] = React.useState(true);
  const [open, setOpen] = React.useState(true);
  const [setShowMagnifier] = useMagnifierControllerStore((state) => [
    state.setShowMagnifier,
  ]);

  // get token
  function onClick() {
    setTokenLoading(true);
    setDidPressStart(true);
    start().then((token) => {
      setToken(token);
      setTokenLoading(false);
    });
  }

  // hide Magnifier if stat screen is open
  useEffect(() => {
    if (open) {
      setShowMagnifier(false);
    }
    return () => {};
  }, [open, setShowMagnifier]);

  // download the image
  useEffect(() => {
    const controller = new AbortController();
    fetch("/wheres-vader.jpg", { signal: controller.signal }).then((res) => {
      res.blob().then((blob) => {
        setImgBlob(blob);
        setImgLoading(false);
      });
    });

    return () => {
      controller.abort();
    };
  }, [setImgBlob]);

  // close start screen
  useEffect(() => {
    setOpen(!didPressStart ?? (tokenLoading && imgLoading));
  }, [didPressStart, imgLoading, tokenLoading]);

  return (
    <>
      {open && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-zinc-950">
          <ParticleEffect />
          <h2 className="absolute top-0 left-0 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-8xl text-cyan-400">
            press start to play...
          </h2>
          <h1 className="text-3xl text-yellow-300 sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-9xl font-StarJHol">
            {"Where's vader"}
          </h1>
          <div className=" sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-7xl text-yellow-300 font-StarJedi max-w-[75vw] text-center">
            Race against the clock to find the three characters below in the
            lego Star Wars-themed {"Where's"} Waldo-style image. Enter your name
            and compete for a spot on the global leaderboard.
          </div>
          {tokenLoading && imgLoading ? (
            <>
              <button
                disabled
                type="button"
                className="z-10 m-2 py-2.5 px-5 me-2 text-sm font-medium text-white rounded-lg border border-gray-200 bg-zinc-950 hover:text-yellow-300 hover:border-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-yellow-300   inline-flex items-center"
              >
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </button>
            </>
          ) : (
            <>
              <button
                className="z-10 m-2 sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-7xl font-StarJOut text-white hover:text-yellow-400 border border-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-yellow-400 dark:focus:ring-yellow-900"
                onClick={onClick}
              >
                Start
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Start;
