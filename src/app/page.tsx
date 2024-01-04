"use client";
import Start from "./components/Start";
import { useEffect, useState } from "react";
import Timer from "./components/Timer";
import Target from "@/app/types/Target";
import Targets from "./components/Targets";
import WaldoImage from "./components/WaldoImage";
import Magnifier from "./components/Magnifier";
import MagnifierControl from "./components/MagnifierControl";
import TargetsDropdown from "./components/TargetsDropdown";
import { jwtDecode } from "jwt-decode";
import End from "./components/End";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const src = "/wheres-vader.jpg";

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [start, setStart] = useState<Date>(new Date());
  const [token, setToken] = useState<string>("");
  const [gameEnded, setGameEnded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (token != "") {
      const { targets, start } = jwtDecode<tokenPayload>(token);
      setTargets(targets);
      setStart(new Date(start));
      if (targets.length == 0) {
        setGameEnded(true);
      }
    }
  }, [token]);
  return (
    <>
      <Start {...{ setToken }} />
      <div className="flex flex-col h-dvh">
        <div className="flex bg-zinc-950 w-screen justify-center items-center">
          <Targets {...{ targets }} />
          <Timer {...{ start }} />
          <MagnifierControl />
          <Button
            variant={"outline"}
            onClick={() => router.push("/leaderboard")}
          >
            LeaderBoard
          </Button>
        </div>
        <div className="flex-grow-0 overflow-y-scroll no-scrollbar">
          <WaldoImage {...{ src }} />
        </div>
      </div>
      <Magnifier {...{ src }} />
      <TargetsDropdown {...{ targets, token, setToken }} />
      <Toaster />

      <End {...{ gameEnded, token, setToken }} />
    </>
  );
}
type tokenPayload = {
  targets: Target[];
  start: string;
};
