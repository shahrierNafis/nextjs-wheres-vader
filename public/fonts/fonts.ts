import localFont from "next/font/local";

const StarJedi = localFont({
  src: "./StarJedi.ttf",

  variable: "--font-StarJedi",
});
const StarJHol = localFont({
  src: "./StarJHol.ttf",

  variable: "--font-StarJHol",
});
const StarJOut = localFont({
  src: "./StarJOut.ttf",

  variable: "--font-StarJOut",
});
const fonts = [StarJedi, StarJHol, StarJOut];
export default fonts;
