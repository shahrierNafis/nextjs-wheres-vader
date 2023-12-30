import React, { useEffect, useState } from "react";

function Timer({ start }: { start: Date }) {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const interval = setInterval(() => {
      const result = new Date(new Date().getTime() - start.getTime())
        .toISOString()
        .slice(11, 19);
      setTime(result);
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);
  return (
    <>
      <div className="border shadow text-white m-2 p-2 font-StarJedi max-w-fit rounded">
        {time}
      </div>
    </>
  );
}

export default Timer;
