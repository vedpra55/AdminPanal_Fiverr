import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, session, pageProps }) {
  return (
    <SessionProvider session={session}>
      <div className={inter.className}>
        <Toaster />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
