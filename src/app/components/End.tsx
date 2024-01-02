import React, { useEffect, useState } from "react";
import end from "../serverActions/end";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import submit from "../serverActions/submit";

function End({
  gameEnded,
  token,
  setToken,
}: {
  gameEnded: boolean;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    (async () => {
      if (gameEnded) {
        setShow(true);
        const newToken = await end(token);
        if (newToken) {
          setToken(newToken);
        }
      }
    })();

    return () => {};
  }, [setToken, gameEnded, token]);

  function onSubmit() {
    if (name != "") {
      setShow(false);
      submit(token, name);
    }
  }
  return (
    <>
      {show && (
        <>
          <div className="flex flex-col items-center justify-center fixed top-0 left-0 bottom-0 right-0 bg-zinc-950">
            <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-9xl text-yellow-300 font-StarJedi text-center">
              Enter Your Name
            </div>
            <Input
              className="m-4 text-center max-w-[75vw]: text-3xl font-StarJOut text-yellow-400"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              className="m-2 p-2 sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-7xl font-StarJOut text-white hover:text-yellow-400 border border-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-white dark:text-white dark:hover:text-yellow-400 dark:focus:ring-yellow-900"
              onClick={onSubmit}
              variant="outline"
            >
              Submit
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default End;
