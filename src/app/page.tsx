"use client";
import Start from "./components/Start";
import { useState } from "react";
import Timer from "./components/Timer";
import Target from "@/app/types/Target";
import Targets from "./components/Targets";
import WaldoImage from "./components/WaldoImage";
import Magnifier from "./components/Magnifier";
const src = "/wheres-vader.jpg";

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [start, setStart] = useState<Date>(new Date());

  return (
    <>
      <Start {...{ setTargets, setStart }} />
      <Timer {...{ start }} />
      <Targets {...{ targets }} />
      <WaldoImage {...{ src }} />
      <Magnifier {...{ src }} />
    </>
  );
}
