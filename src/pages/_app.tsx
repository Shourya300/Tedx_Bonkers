import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
<<<<<<< HEAD
import type { AppProps } from "next/app";
=======
// import FloatingNav from "@/components/FloatingNav/FloatinNav";
>>>>>>> 8dec909 (hehe 2.0)

function MyApp({ Component, pageProps, router }: AppProps) {
  const showHeaderFooter =
    // router.pathname !== "/" && // Enable on index
    router.pathname !== "/page" && router.pathname !== "/wordle";

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      {showHeaderFooter && <Navbar />}
      <Component {...pageProps} />

    </ThemeProvider>
  );
}

export default MyApp;
