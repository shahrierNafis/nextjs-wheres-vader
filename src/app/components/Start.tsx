import React, { SetStateAction } from "react";
import start from "../serverActions/start";
import { jwtDecode } from "jwt-decode";
import Target from "@/app/types/Target";
type tokenPayload = {
  targets: Target[];
  start: string;
};
function Start({
  setTargets,
  setStart,
}: {
  setTargets: React.Dispatch<SetStateAction<Target[]>>;
  setStart: React.Dispatch<SetStateAction<Date>>;
}) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  function onClick() {
    setLoading(true);
    start()
      .then((token) => {
        const { targets, start } = jwtDecode<tokenPayload>(token);
        setTargets(targets);
        setStart(new Date(start));
      })
      .then(() => {
        setOpen(false);
      });
  }
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
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
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
