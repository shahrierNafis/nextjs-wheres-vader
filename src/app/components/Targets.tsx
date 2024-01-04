import React from "react";
import Target from "../types/Target";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
function Targets({ targets }: { targets: Target[] }) {
  return (
    <>
      <div className="flex text-3xl items-center">
        <span>Targets: </span>
        <div className="flex">
          {targets.map((target) => (
            <TooltipProvider key={target.id}>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    layout
                    transition={{ duration: 0.5 }}
                    className="border shadow rounded "
                  >
                    <Image src={target.imgUrl} alt="" width={50} height={50} />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{target.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </>
  );
}

export default Targets;
