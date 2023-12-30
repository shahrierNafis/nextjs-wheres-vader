"use client";
import Image from "next/image";
import Start from "./components/Start";
import Target from "@/app/types/Target";
import { useState } from "react";

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([]);
  return (
    <>
      <Start {...{ setTargets }} />
    </>
  );
}
