"use client";
import Start from "./components/Start";
import { useEffect, useState } from "react";
import Timer from "./components/Timer";
import Target from "@/app/types/Target";
import Targets from "./components/Targets";
import WaldoImage from "./components/WaldoImage";
import Magnifier from "./components/Magnifier";
import MagnifierControl from "./components/MagnifierControl";
import { jwtDecode } from "jwt-decode";
const src = "/wheres-vader.jpg";

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [start, setStart] = useState<Date>(new Date());
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (token != "") {
      const { targets, start } = jwtDecode<tokenPayload>(token);
      setTargets(targets);
      setStart(new Date(start));
    }
  }, [token]);
  return (
    <>
      <Start {...{ setToken }} />
      <Timer {...{ start }} />
      <Targets {...{ targets }} />
      <MagnifierControl />
      <WaldoImage {...{ src }} />
      <Magnifier {...{ src }} />
    </>
  );
}
type tokenPayload = {
  targets: Target[];
  start: string;
};
