import styled, { keyframes } from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import { motion, useScroll, useTransform } from "framer-motion";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LogoIcon from "../../svgs/LogoIcon";
import pxToRem from "../../../utils/pxToRem";
import MuxPlayer from "@mux/mux-player-react";
import router from "next/router";
import { useState, useEffect } from "react";

const HomeHeroWrapper = styled.section<{ $bg: string; $mediaHeight: number }>`
  background-color: ${(props) => props.$bg};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${(props) => pxToRem(props.$mediaHeight)};
  }
`;

const Inner = styled.div`
  height: 100lvh;
  max-width: 1170px;
`;

const LogoWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${pxToRem(24)};
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-right: ${pxToRem(8)};
    top: 2px;

    svg {
      width: 104px;
      height: auto;
    }
  }
`;

const ContentWrapper = styled(motion.div)``;

const ContentInner = styled(motion.span)`
  display: flex;
  flex-wrap: wrap;
  padding-top: ${pxToRem(40)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-top: ${pxToRem(10)};
  }
`;

const Word = styled(motion.span)`
  color: var(--colour-foreground);
  font-size: ${pxToRem(102)};
  letter-spacing: 1.022px;
  font-family: var(--font-holise-extra-light);
  white-space: pre;
  line-height: 0.9;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(45)};
    line-height: ${pxToRem(45)};
  }
`;

const MediaWrapper = styled.div`
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-top: 56.25%;
    transform: translateY(50%);
    width: 100%;
  }
`;

const MediaInner = styled(motion.div)`
  height: 100lvh;
  width: 80vw;
  transform: translateY(-25%);
  margin: 0 auto;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    height: 100%;
    width: 100%;
    transform: unset;
    position: absolute;
    inset: 0;
  }

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      staggerChildren: 0.1,
      delayChildren: 0.5,
      when: "beforeChildren",
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    x: -3,
    filter: "blur(5px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  data: HomePageType["heroSection"];
};

const HomeHero = (props: Props) => {
  const {
    data: { heroBackgroundColour, heroDescription, showreelVideo },
  } = props;

  const { scrollY } = useScroll();

  const [windowHeight, setWindowHeight] = useState(0);
  const [mediaHeight, setMediaHeight] = useState(0);

  const width = useTransform(scrollY, [0, windowHeight], ["80vw", "100vw"]);

  const mediaTransform = useTransform(
    scrollY,
    [0, windowHeight],
    ["translateY(-25%)", "translateY(0%)"]
  );

  const contentTransform = useTransform(
    scrollY,
    [0, windowHeight],
    ["translateY(0%)", "translateY(100%)"]
  );

  const blur = useTransform(
    scrollY,
    [0, windowHeight],
    ["blur(0px)", "blur(10px)"]
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      if (window.innerWidth < 768) {
        setMediaHeight(window.innerWidth * 0.5625);
      } else {
        setMediaHeight(0);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router]);

  return (
    <HomeHeroWrapper
      $bg={heroBackgroundColour?.hex || "#421244"}
      $mediaHeight={mediaHeight}
    >
      <LayoutWrapper>
        <Inner>
          {heroDescription && (
            <ContentWrapper
              style={{ transform: contentTransform, filter: blur }}
            >
              <ContentInner
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <LogoWrapper>
                  <LogoIcon />
                </LogoWrapper>
                {heroDescription.split(" ").map((word, index) => (
                  <Word key={`${word}-${index}`} variants={childVariants}>
                    {word}{" "}
                  </Word>
                ))}
              </ContentInner>
            </ContentWrapper>
          )}
        </Inner>
      </LayoutWrapper>
      {showreelVideo?.asset?.playbackId && (
        <MediaWrapper>
          <MediaInner style={{ width, transform: mediaTransform }}>
            <MuxPlayer
              streamType="on-demand"
              playbackId={showreelVideo.asset.playbackId}
              autoPlay="muted"
              loop={true}
              thumbnailTime={1}
              preload="auto"
              muted
              playsInline={true}
            />
          </MediaInner>
        </MediaWrapper>
      )}
    </HomeHeroWrapper>
  );
};

export default HomeHero;
