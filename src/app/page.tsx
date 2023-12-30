"use client";
import Start from "./components/Start";
import { useState } from "react";
import Timer from "./components/Timer";
import Target from "@/app/types/Target";
import Targets from "./components/Targets";

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [start, setStart] = useState<Date>(new Date());
  return (
    <>
      <Start {...{ setTargets, setStart }} />
      <Timer {...{ start }} />
      <Targets {...{ targets }} />
    </>
  );
}
