import "../globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LocomotiveScroll from 'locomotive-scroll';

import Head from "next/head";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { StateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducers";
import Cursor from "../components/Cursor";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    if (typeof window !== "undefined") { 
        const locomotiveScroll = new LocomotiveScroll();
        return () => {
            locomotiveScroll.destroy();
        };
    }
}, []);

  const router = useRouter();
  const [cookies] = useCookies();
  useEffect(() => {
    if (
      router.pathname.includes("/seller") ||
      router.pathname.includes("/buyer")
    ) {
      if (!cookies.jwt) {
        router.push("/");
      }
    }
  }, [cookies, router]);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="relative flex flex-col h-screen justify-between">
        <Navbar />
        <Cursor/>
        <div
          className={`${
            router.pathname !== "/" ? "mt-36" : ""
          } mb-auto w-full mx-auto`}
        >
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </StateProvider>
  );
}
