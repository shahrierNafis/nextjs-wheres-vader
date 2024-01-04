"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Record = {
  id: string;
  index: number;
  name: string;
  time: Timestamp;
};

export const columns: ColumnDef<Record>[] = [
  {
    accessorKey: "index",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "time",
    id: "Time",
    header: "Time",
    accessorFn: (row) => {
      return new Date(row.time.seconds * 1000).toISOString().slice(11, 19);
    },
  },
];
