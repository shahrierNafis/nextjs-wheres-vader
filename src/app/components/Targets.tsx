import React from "react";
import Target from "../types/Target";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
function Targets({ targets }: { targets: Target[] }) {
  return (
    <>
      <div className="flex">
        {targets.map((target) => (
          <TooltipProvider key={target.id}>
            <Tooltip>
              <TooltipTrigger>
                <div key={target.id} className="border shadow rounded">
                  <Image src={target.imgUrl} alt="" width={50} height={50} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{target.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </>
  );
}

export default Targets;
