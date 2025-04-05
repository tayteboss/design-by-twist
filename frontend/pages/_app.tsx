import { useEffect, useState } from "react";
import "../styles/fonts.css";
import { ThemeProvider } from "styled-components";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import Layout from "../components/layout";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/global";
import use1vh from "../hooks/use1vh";
import { TransitionsType } from "../shared/types/types";
import useHeaderHeight from "../hooks/useHeaderHeight";
import Cursor from "../components/elements/Cursor";

const pageTransitionVariants: TransitionsType = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, transition: { duration: 0.3, delay: 0.25 } },
};

type Props = {
  Component: any;
  pageProps: {};
};

const App = (props: Props) => {
  const { Component, pageProps } = props;

  const [hasVisited, setHasVisited] = useState<boolean>(false);
  const [appCursorRefresh, setAppCursorRefresh] = useState(0);

  const router = useRouter();
  const routerEvents = router.events;

  const handleExitComplete = (): void => {
    window.scrollTo(0, 0);
  };

  use1vh();
  useHeaderHeight();

  useEffect(() => {
    setAppCursorRefresh(appCursorRefresh + 1);

    const body = document.querySelector("body");

    if (router?.pathname === "/404") {
      body?.classList.add("modal-open");
    } else {
      body?.classList.remove("modal-open");
    }

    const timer = setTimeout(() => {
      setAppCursorRefresh(appCursorRefresh + 1);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [router.asPath]);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Layout>
          <AnimatePresence
            mode="wait"
            onExitComplete={() => handleExitComplete()}
          >
            <Component
              {...pageProps}
              key={router.asPath}
              pageTransitionVariants={pageTransitionVariants}
            />
          </AnimatePresence>
        </Layout>
        <Cursor
          cursorRefresh={() => setAppCursorRefresh(appCursorRefresh + 1)}
          appCursorRefresh={appCursorRefresh}
        />
      </ThemeProvider>
    </>
  );
};

export default App;
