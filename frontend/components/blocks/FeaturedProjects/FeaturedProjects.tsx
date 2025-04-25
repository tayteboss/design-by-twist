import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LogoIcon from "../../svgs/LogoIcon";
import { useCallback, useEffect, useRef, useState } from "react";
import pxToRem from "../../../utils/pxToRem";
import MediaStack from "../../common/MediaStack";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Link from "next/link";
import useViewportWidth from "../../../hooks/useViewportWidth";

const FeaturedProjectsWrapper = styled.section<{ $bg: string }>`
  background-color: ${(props) => props.$bg};
  transition: all var(--transition-speed-slow) var(--transition-ease);
  position: relative;
  z-index: 20;
`;

const ContentBar = styled.div`
  pointer-events: none;
`;

const ContentInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: ${pxToRem(24)} 0;
  gap: ${pxToRem(24)};
`;

const Title = styled.h2<{ $useWhiteLogo: boolean }>`
  display: flex;
  align-items: start;
  gap: ${pxToRem(16)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    gap: ${pxToRem(8)};
  }

  div {
    font-size: ${pxToRem(50)};
    line-height: ${pxToRem(50)};
    font-family: var(--font-holise-extra-light);
    font-weight: 200;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(35)};
      line-height: ${pxToRem(40)};
      height: 40px;
    }
  }

  svg {
    position: relative;
    top: 4px;
    width: ${pxToRem(120)};
    max-width: ${pxToRem(120)};
    height: auto;

    path,
    rect {
      fill: ${(props) =>
        props.$useWhiteLogo
          ? "var(--colour-white)"
          : "var(--colour-foreground)"};

      transition: all var(--transition-speed-default) var(--transition-ease);
    }

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      width: ${pxToRem(110)};
      max-width: ${pxToRem(110)};
      min-width: ${pxToRem(110)};
    }
  }
`;

const Description = styled(motion.p)`
  font-size: ${pxToRem(20)};
  line-height: ${pxToRem(17)};
  text-align: right;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const FeaturedGalleryWrapper = styled.div`
  padding: ${pxToRem(80)} 0 ${pxToRem(120)};
  overflow: hidden;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(80)} 0 ${pxToRem(24)};
  }
`;

const Embla = styled.div`
  overflow: hidden;
  cursor: grab;

  &.grabbing {
    cursor: grabbing;
  }
`;

const EmblaContainer = styled.div<{ $height: number }>`
  display: flex;
  align-items: center;
  height: ${(props) => props.$height}px;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    align-items: flex-end;
  }
`;

const EmblaSlide = styled.div<{ $isActive: boolean }>`
  min-width: 0;
  position: relative;
  transform-origin: center center;
  flex: 0 0 39vw;
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    transform-origin: center bottom;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    flex: 0 0 50vw;
  }
`;

const MediaWrapper = styled.div<{ $isActive: boolean }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${pxToRem(8)};
  transform-origin: center center;
  transition: padding-top 1s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    img,
    video {
      transform: scale(1.05);

      transition: all var(--transition-speed-default) var(--transition-ease);
    }
  }

  & > *,
  a,
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;

    img,
    video,
    .media-wrapper {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

type Props = {
  data: HomePageType["featuredProjectsSection"];
};

const FeaturedProjects = (props: Props) => {
  const {
    data: { featuredProjects },
  } = props;

  const hasData = featuredProjects && featuredProjects.length > 0;

  const startIndex = Math.floor(featuredProjects.length / 2);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: false,
    startIndex: startIndex,
    skipSnaps: true,
    watchResize: false,
  });

  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [emblaHeight, setEmblaHeight] = useState(0);

  const viewport = useViewportWidth();

  const numberWithinRange = (
    number: number,
    min: number,
    max: number
  ): number => Math.min(Math.max(number, min), max);

  const scaleNodes = useRef<HTMLElement[]>([]);

  const tweenScale = useCallback(
    // Removed unused 'eventName' parameter
    (emblaApi: EmblaCarouselType) => {
      const scrollProgress = emblaApi.scrollProgress();
      const slideNodes = emblaApi.slideNodes(); // Get nodes directly
      const scrollSnaps = emblaApi.scrollSnapList();

      // Determine viewport state (assuming 'viewport' is available in the outer scope)
      const isMobile = viewport === "mobile";

      // Define configuration values based on viewport *once* per call
      const config = {
        // Scale values
        peakScale: 1.0,
        nearScaleTarget: isMobile ? 0.6 : 0.3, // Target scale at diff = 1
        midScaleTarget: 0.5, // Target scale at diff = 2 (from original interpolation)
        baseScale: isMobile ? 0.6 : 0.4, // Default scale for diff >= 2
        minScale: isMobile ? 0.6 : 0.1, // Minimum clamped scale

        // Padding values
        peakPaddingTop: 125,
        basePaddingTop: isMobile ? 62 : 56.25,

        // Flex values (as fractions)
        minFlex: 0.15,
        maxFlex: 0.4,
      };

      scrollSnaps.forEach((scrollSnap, snapIndex) => {
        const diffToTarget = scrollSnap - scrollProgress;
        const absoluteDiff = Math.abs(diffToTarget);

        let scale: number;
        let paddingTop: number;
        let flex: number;

        // Calculate styles based on proximity (absoluteDiff)
        if (absoluteDiff < 1) {
          // Interpolate scale between peak (1.0) and near target
          scale =
            config.peakScale -
            absoluteDiff * (config.peakScale - config.nearScaleTarget);
          // Set padding (peak only when very close)
          paddingTop =
            absoluteDiff < 0.05 ? config.peakPaddingTop : config.basePaddingTop;
          // Interpolate flex between max (0.4) and min (0.15)
          // Note: Original logic repeated the same formula; adjusted for clarity.
          // This makes flex max (0.4) at diff 0, min (0.15) at diff 1.
          flex =
            config.maxFlex - absoluteDiff * (config.maxFlex - config.minFlex);
        } else if (absoluteDiff < 2) {
          // Interpolate scale between near target and mid target (0.5)
          scale =
            config.nearScaleTarget -
            (absoluteDiff - 1) *
              (config.nearScaleTarget - config.midScaleTarget);
          // Use base padding
          paddingTop = config.basePaddingTop;
          // Use minimum flex
          flex = config.minFlex; // Assign minFlex directly for diff >= 1
        } else {
          // Default values for slides further away
          scale = config.baseScale;
          paddingTop = config.basePaddingTop;
          flex = config.minFlex;
        }

        // Clamp final values using the helper function
        const finalScale = numberWithinRange(
          scale,
          config.minScale,
          config.peakScale
        ).toString();
        const finalPaddingTop = numberWithinRange(
          paddingTop,
          config.basePaddingTop, // Use base as minimum for clamping padding
          config.peakPaddingTop
        ).toString();
        // Clamp flex and convert fraction to a percentage value for potential CSS use
        const finalFlexPercent =
          numberWithinRange(flex, config.minFlex, config.maxFlex) * 100;

        // Get the specific slide node
        const slideNode = slideNodes[snapIndex];

        // Apply styles within requestAnimationFrame
        if (slideNode) {
          window.requestAnimationFrame(() => {
            slideNode.style.transform = `scale(${finalScale})`;
            slideNode.style.zIndex = absoluteDiff < 0.5 ? "1" : "0";

            // Original flex style was commented out, keeping it commented.
            // If needed, use finalFlexPercent: e.g., `0 0 ${finalFlexPercent}%`
            // slideNode.style.flex = `0 0 ${finalFlexPercent}%`;

            // Safely target the first child for padding adjustment
            const firstChild = slideNode.firstElementChild;
            if (firstChild instanceof HTMLElement) {
              // Safer check
              firstChild.style.paddingTop = `${finalPaddingTop}%`;
            }
          });
        }
      });
    },
    // Dependencies MUST include variables from the outer scope used inside
    [numberWithinRange, viewport]
  );

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const activeIndex = emblaApi.selectedScrollSnap();
      setActiveIndex(activeIndex);
      tweenScale(emblaApi, "select");
    },
    [featuredProjects, tweenScale]
  );

  const findEmblaHeight = () => {
    const timer = setTimeout(() => {
      const emblaSlides = document.querySelectorAll(".embla__slide");
      const heights: number[] = [];
      emblaSlides.forEach((slide) => {
        heights.push(slide.getBoundingClientRect().height);
      });

      setEmblaHeight(Math.max(...heights));
    }, 1000);

    return () => clearTimeout(timer);
  };

  const addGrabCursor = () => {
    const emblaContainer = document.querySelector(".embla");
    emblaContainer?.classList.add("grabbing");
  };

  const removeGrabCursor = () => {
    const emblaContainer = document.querySelector(".embla");
    emblaContainer?.classList.remove("grabbing");
  };

  useEffect(() => {
    if (!emblaApi) return;

    tweenScale(emblaApi);

    emblaApi
      .on("select", onSelect)
      .on("scroll", tweenScale)
      .on("reInit", tweenScale)
      .on("pointerDown", addGrabCursor)
      .on("pointerUp", removeGrabCursor);

    return () => {
      emblaApi
        .off("select", onSelect)
        .off("scroll", tweenScale)
        .off("reInit", tweenScale)
        .off("pointerDown", addGrabCursor)
        .off("pointerUp", removeGrabCursor);
    };
  }, [emblaApi, tweenScale, onSelect]);

  useEffect(() => {
    findEmblaHeight();
  }, [emblaApi]);

  return (
    <FeaturedProjectsWrapper
      $bg={
        featuredProjects[activeIndex]?.featuredColour?.hex ||
        "var(--colour-foreground)"
      }
    >
      {hasData && (
        <>
          <ContentBar>
            <LayoutWrapper>
              <ContentInner>
                <Title
                  $useWhiteLogo={
                    featuredProjects[activeIndex]?.useWhiteFeaturedLogo
                  }
                >
                  <LogoIcon />
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -5, filter: "blur(3px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: 5, filter: "blur(3px)" }}
                    transition={{ duration: 0.5 }}
                  >
                    {featuredProjects[activeIndex]?.featuredTagline || ""}
                  </motion.div>
                </Title>
                <Description
                  key={activeIndex}
                  initial={{ opacity: 0, x: -5, filter: "blur(3px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 5, filter: "blur(3px)" }}
                  transition={{ duration: 0.5 }}
                >
                  {featuredProjects[activeIndex]?.featuredDescription || ""}
                </Description>
              </ContentInner>
            </LayoutWrapper>
          </ContentBar>
          <FeaturedGalleryWrapper className="cursor-gallery">
            <Embla className="embla" ref={emblaRef}>
              <EmblaContainer
                className="embla__container"
                $height={emblaHeight}
              >
                {featuredProjects.map((project, i) => (
                  <EmblaSlide
                    className="embla__slide cursor-gallery__slide"
                    data-cursor-title={project?.title || ""}
                    key={i}
                    $isActive={i === activeIndex}
                  >
                    <MediaWrapper
                      $isActive={i === activeIndex}
                      className="embla__media-wrapper"
                    >
                      <Link href={`/work/${project?.slug?.current}`}>
                        <MediaStack
                          data={project?.defaultThumbnail}
                          isPriority={
                            i >= activeIndex - 1 && i <= activeIndex + 1
                          }
                          noAnimation
                        />
                      </Link>
                    </MediaWrapper>
                  </EmblaSlide>
                ))}
              </EmblaContainer>
            </Embla>
          </FeaturedGalleryWrapper>
        </>
      )}
    </FeaturedProjectsWrapper>
  );
};

export default FeaturedProjects;
