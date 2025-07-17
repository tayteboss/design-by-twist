import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import pxToRem from "../../../utils/pxToRem";
import formatHTML from "../../../utils/formatHTML";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";

const StudioHeroWrapper = styled.section`
  background: var(--colour-black);
  position: relative;
  z-index: 5;
`;

const Inner = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${pxToRem(80)} 0;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const Title = styled.div`
  * {
    color: var(--colour-white);
    font-size: ${pxToRem(70)};
    line-height: ${pxToRem(75)};
    font-family: var(--font-holise-extra-light);
    font-weight: 200;
    max-width: ${pxToRem(1200)};
    margin: 0 auto;
    text-align: center;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(40)};
      line-height: ${pxToRem(40)};
    }
  }
`;

type Props = {
  data: StudioPageType["heroSection"];
};

const StudioHero = (props: Props) => {
  const { data } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const [windowHeight, setWindowHeight] = useState(0);

  const router = useRouter();

  const blur = useTransform(
    scrollY,
    [0, windowHeight * 2],
    ["blur(0px)", "blur(25px)"]
  );

  const transform = useTransform(
    scrollY,
    [0, windowHeight * 2],
    ["translateY(0px)", "translateY(50%)"]
  );

  const opacity = useTransform(scrollY, [0, windowHeight * 2], ["1", "0"]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const timer = setTimeout(() => {
      setWindowHeight(window.innerHeight);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router.asPath]);

  return (
    <StudioHeroWrapper ref={ref}>
      <LayoutWrapper>
        <Inner style={{ opacity, transform, filter: blur }}>
          {data?.heroDescription && (
            <Title
              dangerouslySetInnerHTML={{
                __html: formatHTML(data.heroDescription, "h1"),
              }}
            />
          )}
        </Inner>
      </LayoutWrapper>
    </StudioHeroWrapper>
  );
};

export default StudioHero;
