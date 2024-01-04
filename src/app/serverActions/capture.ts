"use server";

import jwt from "jsonwebtoken";
import Target from "../types/Target";

export default async function capture(
  token: string,
  [x, y]: [number, number],
  id: number
) {
  try {
    if (process.env.JWT_SECRET) {
      const data = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      const [{ x1, y1, x2, y2 }] = coordinates.filter((c) => c.id == id);
      // check if in range
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        if (data == undefined) {
          throw new Error("Invalid token");
        } else {
          // remove from list
          data.targets = data.targets.filter((l) => l.id != id);
          if (data.targets.length == 0) {
            data.end = new Date();
          }
          // send new data
          return jwt.sign(data, process.env.JWT_SECRET!);
        }
      } else {
        throw new Error("Out of range");
      }
    } else {
      throw new Error("JWT_SECRET is not provided");
    }
  } catch (err) {
    return { error: (err as Error).message };
  }
}
const coordinates = [
  { id: 1, x1: 20, y1: 15, x2: 30, y2: 20 },
  { id: 2, x1: 50, y1: 85, x2: 60, y2: 90 },
  { id: 3, x1: 85, y1: 30, x2: 95, y2: 40 },
  { id: 4, x1: 20, y1: 25, x2: 30, y2: 30 },
  { id: 5, x1: 15, y1: 45, x2: 20, y2: 50 },
  { id: 6, x1: 15, y1: 65, x2: 35, y2: 75 },
  { id: 7, x1: 40, y1: 70, x2: 45, y2: 75 },
  { id: 8, x1: 15, y1: 80, x2: 20, y2: 85 },
  { id: 9, x1: 75, y1: 60, x2: 80, y2: 65 },
  { id: 10, x1: 10, y1: 8, x2: 25, y2: 15 },
  { id: 11, x1: 50, y1: 40, x2: 60, y2: 50 },
  { id: 12, x1: 85, y1: 60, x2: 90, y2: 65 },
];

interface JwtPayload {
  targets: Target[];
  start: Date;
  end?: Date;
}
