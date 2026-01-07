import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";

import Navbar from "@/components/Navbar/Navbar";

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
