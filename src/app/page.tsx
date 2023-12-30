"use client";
import Image from "next/image";
import Start from "./components/Start";
import Target from "@/app/types/Target";
import { useState } from "react";
import Timer from "./components/Timer";

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [start, setStart] = useState<Date>(new Date());
  return (
    <>
      <Start {...{ setTargets, setStart }} />
      <Timer start={start} />
    </>
  );
}
