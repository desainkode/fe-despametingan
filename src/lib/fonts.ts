import localFont from "next/font/local";

export const upakarti = localFont({
  src: [
    {
      path: "../../public/fonts/hero-section/upakarti.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/hero-section/upakarti-serong.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-upakarti",
  display: "swap",
});
