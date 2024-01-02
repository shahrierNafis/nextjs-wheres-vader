import jwt from "jsonwebtoken";
import Target from "../types/Target";
export default async function end(token: string) {
  if (process.env.JWT_SECRET) {
    const data = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (data == undefined) {
      throw new Error("Invalid token");
    } else {
      data.end = new Date();
      return jwt.sign(data, process.env.JWT_SECRET);
    }
  }
}
interface JwtPayload {
  targets: Target[];
  start: Date;
  end?: Date;
}
