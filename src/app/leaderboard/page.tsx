"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Record, columns } from "./columns";
import { DataTable } from "./data-table";
import { firestore } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
// import populateStore from "../serverActions/populateStore";
import { Button } from "@/components/ui/button";

function Page() {
  const [data, setData] = useState<Record[]>();
  const searchParams = useSearchParams();
  // get highlighted row id
  const highlightedRowId = useMemo(
    () => searchParams.get("id") ?? "",
    [searchParams]
  );
  const [highlightedRowIndex, setRowIndex] = useState<number>();

  const router = useRouter();
  // set Records
  useEffect(() => {
    getDocs(query(collection(firestore, "records"), orderBy("time"))).then(
      (snapshot) => {
        setData(
          snapshot.docs.map((doc, index) => {
            // set highlighted row index
            if (highlightedRowId === doc.id) {
              setRowIndex(index + 1);
            }
            return {
              id: doc.id,
              index: index + 1,
              name: doc.data().name,
              time: doc.data().time,
            } as Record;
          })
        );
      }
    );
  }, [highlightedRowId]);

  // useEffect(() => {
  //   if (confirm("populate store?")) {
  //     populateStore();
  //   }
  // });

  return (
    <>
      <div className="container mx-auto py-10">
        <Button
          onClick={() => router.push(`/`)}
          className="m-2 text-xl font-StarJOut"
          variant={"outline"}
        >
          {"⬅ Play Again"}
        </Button>

        {data && (
          <DataTable
            {...{ columns, data, highlightedRowId, highlightedRowIndex }}
          />
        )}
      </div>
    </>
  );
}

export default Page;
