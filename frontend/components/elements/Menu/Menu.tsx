import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

const MenuWrapper = styled.div`
  position: absolute;
  bottom: ${pxToRem(32)};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: all;
  transform-origin: center bottom;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    transform: translateX(-50%) scale(1.03);

    .cloud-inner {
      opacity: 1;
    }
  }

  .cloud-inner {
    opacity: 0.75;
  }
`;

const Main = styled.div`
  display: flex;
  gap: ${pxToRem(32)};
  background: rgba(206, 206, 206, 0.25);
  backdrop-filter: blur(20px);
  padding: ${pxToRem(16)} ${pxToRem(32)};
  border-radius: 100px;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(206, 206, 206, 0.5);
  }
`;

const MainItem = styled.div`
  font-size: ${pxToRem(18)};
  line-height: 1;
  font-family: var(--font-acid-grotesk-regular);
  position: relative;

  a {
    position: relative;
    z-index: 5;
  }

  * {
    font-size: ${pxToRem(18)};
    line-height: 1;
    font-family: var(--font-acid-grotesk-regular);
  }
`;

const Button = styled.button`
  position: relative;
  z-index: 5;
`;

const HoverCloud = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 50px;
  z-index: 2;
  pointer-events: none;
`;

const CloudInner = styled.div`
  position: absolute;
  left: -60px;
  top: -25px;
  width: 120px;
  height: 50px;

  &::after {
    content: "";
    background: var(--colour-foreground);
    border-radius: 100px;
    filter: blur(20px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

type Props = {
  contactIsActive: boolean;
  setContactIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = (props: Props) => {
  const { contactIsActive, setContactIsActive } = props;

  const [hoveredIndex, setHoveredIndex] = useState<null | string>(null);
  const [activePage, setActivePage] = useState<string | false>(false);

  const router = useRouter();

  console.log("router", router);

  useEffect(() => {
    if (router.asPath === "/") {
      setActivePage(false);
    } else if (router.asPath.includes("/work")) {
      setActivePage("work");
    } else if (router.asPath === "/studio") {
      setActivePage("studio");
    }
  }, [router.asPath]);

  return (
    <MenuWrapper onMouseLeave={() => setHoveredIndex(null)}>
      <Main>
        <MainItem onMouseEnter={() => setHoveredIndex("work")}>
          <Link href="/work">Work</Link>
          <AnimatePresence>
            {(hoveredIndex === "work" || activePage === "work") && (
              <HoverCloud
                layoutId="underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CloudInner className="cloud-inner" />
              </HoverCloud>
            )}
          </AnimatePresence>
        </MainItem>
        <MainItem onMouseEnter={() => setHoveredIndex("studio")}>
          <Link href="/studio">Studio</Link>
          <AnimatePresence>
            {(hoveredIndex === "studio" || activePage === "studio") && (
              <HoverCloud
                layoutId="underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CloudInner className="cloud-inner" />
              </HoverCloud>
            )}
          </AnimatePresence>
        </MainItem>
        <MainItem onMouseEnter={() => setHoveredIndex("contact")}>
          <Button onClick={() => setContactIsActive(true)}>Contact</Button>
          <AnimatePresence>
            {(hoveredIndex === "contact" || contactIsActive) && (
              <HoverCloud
                layoutId="underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CloudInner className="cloud-inner" />
              </HoverCloud>
            )}
          </AnimatePresence>
        </MainItem>
      </Main>
    </MenuWrapper>
  );
};

export default Menu;
