"use server";
import jwt from "jsonwebtoken";
export default async function start() {
  const randomThree = targetList.sort(() => Math.random() - 0.5).slice(0, 3);

  if (process.env.JWT_SECRET) {
    const token = jwt.sign(
      { targets: randomThree, start: new Date() },
      process.env.JWT_SECRET
    );
    return token;
  } else {
    throw new Error("JWT_SECRET is not provided");
  }
}

const targetList = [
  {
    name: "Obiwan Kenobi",
    id: 1,
    imgUrl: "/images/obiwan-kenobi.jpg",
  },
  {
    name: "Kylo Ren",
    id: 2,
    imgUrl: "/images/kylo-ren.jpg",
  },
  {
    name: "Darth Vader",
    id: 3,
    imgUrl: "/images/darth-vader.jpg",
  },
  {
    name: "Yoda",
    id: 4,
    imgUrl: "/images/yoda.jpg",
  },
  {
    name: "Mace Windu",
    id: 5,
    imgUrl: "/images/mace-windu.jpg",
  },
  {
    name: "Jabba the Hutt",
    id: 6,
    imgUrl: "/images/jabba-the-hutt.jpg",
  },
  {
    name: "Qui-Gon Jinn",
    id: 7,
    imgUrl: "/images/qui-gon-jinn.jpg",
  },
  {
    name: "Anakin Skywalker episode I",
    id: 8,
    imgUrl: "/images/anakin-skywalker-episode-I.jpg",
  },
  {
    name: "Sheev Palpatine",
    id: 9,
    imgUrl: "/images/sheev-palpatine.jpg",
  },
];
