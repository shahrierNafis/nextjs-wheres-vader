"use server";
import { createFirebaseAdminApp } from "@/initialize-firebase-admin-app";
import { getFirestore } from "firebase-admin/firestore";
import Target from "../types/Target";
import jwt from "jsonwebtoken";
async function initializeAdmin() {
  if (process.env.FIREBASE_PRIVATE_KEY) {
    return createFirebaseAdminApp(process.env.FIREBASE_PRIVATE_KEY);
  } else {
    throw new Error("FIREBASE_PRIVATE_KEY is not provided");
  }
}

export default async function submit(token: string, name: string) {
  if (process.env.JWT_SECRET) {
    await initializeAdmin();
    const firestore = getFirestore();
    const data = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (data == undefined) {
      throw new Error("Invalid token");
    } else {
      if (data.targets.length == 0 && data.end && data.start) {
        const time = new Date(
          new Date(data.end).getTime() - new Date(data.start).getTime()
        );
        return (await firestore.collection("records").add({ name, time })).id;
      }
    }
  } else {
    throw new Error("JWT_SECRET is not provided");
  }
}
interface JwtPayload {
  targets: Target[];
  start: string;
  end?: string;
}
