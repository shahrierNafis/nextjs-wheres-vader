import React, { useEffect, useRef } from "react";
import Target from "../types/Target";
import { useDropdownStore, useMagnifierStore } from "@/useStore";
import Image from "next/image";
import capture from "../serverActions/capture";
import { useToast } from "@/components/ui/use-toast";
function TargetsDropdown({
  targets,
  token,
  setToken,
}: {
  targets: Target[];
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dropdown = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useDropdownStore((state) => [
    state.showDropdown,
    state.setShowDropdown,
  ]);
  const [clientX, clientY] = useMagnifierStore((state) => state.clientXY);
  const [percentX, percentY] = useMagnifierStore((state) => state.XYpercent);
  const { toast } = useToast();

  useEffect(() => {
    if (dropdown.current) {
      const { right, bottom } = dropdown.current.getBoundingClientRect();
      if (right > window.innerWidth) {
        dropdown.current.style.transform = `translateX(-${
          right - window.innerWidth
        }px)`;
      }
      if (bottom > window.innerHeight) {
        dropdown.current.style.transform += ` translateY(-${
          bottom - window.innerHeight
        }px)`;
      }
    }
  });
  return (
    showDropdown && (
      <>
        <div
          className="fixed top-0 bottom-0 left-0 right-0"
          onClick={() => setShowDropdown(false)}
        >
          <div
            ref={dropdown}
            className="absolute flex flex-col m-2 max-w-fit bg-zinc-950"
            style={{
              top: `${clientY}px`,
              left: `${clientX}px`,
            }}
          >
            {targets.map((target) => (
              <div
                key={target.id}
                className="flex items-center flex-shrink-0 border rounded shadow min-w-fit text-nowrap"
                onClick={async () => {
                  setShowDropdown(false);
                  const newToken = await capture(
                    token,
                    [percentX, percentY],
                    target.id
                  );

                  if (typeof newToken === "string") {
                    setToken(newToken);
                    toast({
                      title: "Target Captured",
                      description: `You have captured the ${target.name}!`,
                    });
                  } else {
                    toast({
                      title: "Wrong!",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <div className="relative w-[4rem] h-[4rem]">
                  <Image src={target.imgUrl} alt="" fill />
                </div>
                <p>{target.name}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
}

export default TargetsDropdown;
