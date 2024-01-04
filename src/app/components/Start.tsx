import React, { SetStateAction, useEffect } from "react";
import start from "../serverActions/start";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMagnifierStore } from "@/useStore";

function Start({
  setToken,
}: {
  setToken: React.Dispatch<SetStateAction<string>>;
}) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [setShowMagnifier] = useMagnifierStore((state) => [
    state.setShowMagnifier,
  ]);
  function onClick() {
    setLoading(true);
    start()
      .then((token) => {
        setToken(token);
      })
      .then(() => {
        setOpen(false);
      });
  }

  useEffect(() => {
    if (open) {
      setShowMagnifier(false);
    }

    return () => {};
  }, [open, setShowMagnifier]);
  return (
    <>
      {open && (
        <div className="flex flex-col items-center justify-center fixed bg-zinc-950 top-0 left-0 bottom-0 right-0">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-8xl text-cyan-400 absolute top-0 left-0">
            press start to play...
          </h2>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-9xl text-yellow-300 font-StarJHol">
            {"Where's vader"}
          </h1>
          <div className=" sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-7xl text-yellow-300 font-StarJedi max-w-[75vw] text-center">
            Race against the clock to find the three characters below in the
            lego Star Wars-themed {"Where's"} Waldo-style image. Enter your name
            and compete for a spot on the global leaderboard.
          </div>
          {loading ? (
            <>
              <button
                disabled
                type="button"
                className="m-2 py-2.5 px-5 me-2 text-sm font-medium text-white rounded-lg border border-gray-200 bg-zinc-950 hover:text-yellow-300 hover:border-yellow-300 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-yellow-300   inline-flex items-center"
              >
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </button>
            </>
          ) : (
            <>
              <button
                className="m-2 sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-7xl font-StarJOut text-white hover:text-yellow-400 border border-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-yellow-400 dark:focus:ring-yellow-900"
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
