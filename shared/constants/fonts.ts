import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";

const NotoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans"
});

const NotoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-sans-mono"
});

export { NotoSans, NotoSansMono };
