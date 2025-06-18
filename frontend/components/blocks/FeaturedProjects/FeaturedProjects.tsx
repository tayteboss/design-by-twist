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
import FeaturedFinalSlide from "../../elements/FeaturedFinalSlide";

const FeaturedProjectsWrapper = styled.section<{ $bg: string }>`
  background-color: ${(props) => props.$bg};
  transition: all var(--transition-speed-slow) var(--transition-ease);
  position: relative;
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
  color: ${(props) =>
    props.$useWhiteLogo ? "var(--colour-white)" : "var(--colour-black)"};

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

  /* svg {
    position: relative;
    top: 4px;
    width: ${pxToRem(120)};
    max-width: ${pxToRem(120)};
    height: auto;

    path,
    rect {
      fill: ${(props) =>
    props.$useWhiteLogo ? "var(--colour-white)" : "var(--colour-foreground)"};

      transition: all var(--transition-speed-default) var(--transition-ease);
    }

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      width: ${pxToRem(95)};
      max-width: ${pxToRem(95)};
      min-width: ${pxToRem(95)};
    }
  } */
`;

const Description = styled(motion.p)<{ $useWhiteLogo: boolean }>`
  font-size: ${pxToRem(20)};
  line-height: ${pxToRem(17)};
  text-align: right;
  color: ${(props) =>
    props.$useWhiteLogo ? "var(--colour-white)" : "var(--colour-black)"};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const FeaturedGalleryWrapper = styled.div`
  padding: ${pxToRem(80)} 0 ${pxToRem(120)};
  overflow: hidden;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(80)} 0 ${pxToRem(80)};
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
  gap: ${pxToRem(24)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    gap: ${pxToRem(12)};
  }
`;

const EmblaSlide = styled.div<{ $isComingSoon: boolean }>`
  min-width: 0;
  position: relative;
  transform-origin: center center;
  flex: 0 0 39vw;
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    transform-origin: center bottom;
    flex: 0 0 70vw;
  }

  /* --- ADDED: Style override for the last slide --- */
  &:last-child {
    display: flex;
    justify-content: center;

    transform: scale(1) !important;
    z-index: 0 !important;
    /* Ensure padding-top potentially added to child is reset */
    & > div {
      padding-top: 0 !important;
    }
  }

  &::after {
    content: "Coming soon";
    position: absolute;
    bottom: 8px;
    right: 8px;
    z-index: 2;
    border-radius: 4px;
    background: var(--colour-foreground);
    color: var(--colour-black);
    font-size: ${pxToRem(12)};
    line-height: 1;
    padding: ${pxToRem(3)} ${pxToRem(5)};
    white-space: nowrap;
    display: none;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      display: ${(props) => (props.$isComingSoon ? "block" : "none")};
    }
  }
`;

const MediaWrapper = styled.div<{ $isActive: boolean }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${pxToRem(8)};
  transform-origin: center center;
  transition: padding-top 1s cubic-bezier(0.23, 1, 0.32, 1);

  & > *,
  a,
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
    border-radius: ${pxToRem(8)};

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

// --- Component Logic (Original with modifications to tweenScale) ---

type Props = {
  heroBgColour: HomePageType["heroSection"]["heroBackgroundColour"];
  data: HomePageType["featuredProjectsSection"];
};

const FeaturedProjects = (props: Props) => {
  const {
    heroBgColour,
    data: { featuredProjects },
  } = props;

  const hasData = featuredProjects && featuredProjects.length > 0;
  const projectCount = featuredProjects?.length || 0;

  const startIndex = 0;

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

  // scaleNodes ref is unused in original code, kept for consistency
  const scaleNodes = useRef<HTMLElement[]>([]);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const scrollProgress = emblaApi.scrollProgress();
      const slideNodes = emblaApi.slideNodes();
      const scrollSnaps = emblaApi.scrollSnapList();
      const isMobile = viewport === "mobile";

      const config = {
        peakScale: 1.0,
        nearScaleTarget: isMobile ? 0.6 : 0.3,
        midScaleTarget: 0.5,
        baseScale: isMobile ? 0.6 : 0.4,
        minScale: isMobile ? 0.6 : 0.1,
        peakPaddingTop: 125,
        basePaddingTop: isMobile ? 62 : 56.25,
        minFlex: 0.15,
        maxFlex: 0.4,
      };

      scrollSnaps.forEach((scrollSnap, snapIndex) => {
        // --- MODIFICATION START ---
        // Check if the current index is the index of the final slide
        // The final slide's index will be equal to the number of projects
        if (snapIndex >= projectCount) {
          // If it's the final slide, ensure it has default styles and skip effects
          const slideNode = slideNodes[snapIndex];
          if (slideNode) {
            window.requestAnimationFrame(() => {
              slideNode.style.transform = "scale(1)";
              slideNode.style.zIndex = "0";
              // slideNode.style.flex = ''; // Reset flex if it was potentially set
              const firstChild = slideNode.firstElementChild;
              if (firstChild instanceof HTMLElement) {
                firstChild.style.paddingTop = "0"; // Ensure no padding is applied
              }
            });
          }
          return; // Skip applying tween effects to this slide
        }
        // --- MODIFICATION END ---

        // --- Original tween logic for project slides ---
        const diffToTarget = scrollSnap - scrollProgress;
        const absoluteDiff = Math.abs(diffToTarget);
        let scale: number;
        let paddingTop: number;
        let flex: number;

        if (absoluteDiff < 1) {
          scale =
            config.peakScale -
            absoluteDiff * (config.peakScale - config.nearScaleTarget);
          paddingTop =
            absoluteDiff < 0.05 ? config.peakPaddingTop : config.basePaddingTop;
          flex =
            config.maxFlex - absoluteDiff * (config.maxFlex - config.minFlex);
        } else if (absoluteDiff < 2) {
          scale =
            config.nearScaleTarget -
            (absoluteDiff - 1) *
              (config.nearScaleTarget - config.midScaleTarget);
          paddingTop = config.basePaddingTop;
          flex = config.minFlex;
        } else {
          scale = config.baseScale;
          paddingTop = config.basePaddingTop;
          flex = config.minFlex;
        }

        const finalScale = numberWithinRange(
          scale,
          config.minScale,
          config.peakScale
        ).toString();
        const finalPaddingTop = numberWithinRange(
          paddingTop,
          config.basePaddingTop,
          config.peakPaddingTop
        ).toString();
        const finalFlexPercent =
          numberWithinRange(flex, config.minFlex, config.maxFlex) * 100;

        const slideNode = slideNodes[snapIndex];
        if (slideNode) {
          window.requestAnimationFrame(() => {
            slideNode.style.transform = `scale(${finalScale})`;
            slideNode.style.zIndex = absoluteDiff < 0.5 ? "1" : "0";
            // slideNode.style.flex = `0 0 ${finalFlexPercent}%`; // Original commented line
            const firstChild = slideNode.firstElementChild;
            if (firstChild instanceof HTMLElement) {
              firstChild.style.paddingTop = `${finalPaddingTop}%`;
            }
          });
        }
        // --- End of original tween logic ---
      });
    },
    // --- MODIFICATION: Added projectCount to dependency array ---
    [numberWithinRange, viewport, projectCount]
  );

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      // Only update activeIndex if it's a project slide
      setActiveIndex(selectedIndex);
      // Always call tweenScale to update visuals based on scroll position
      tweenScale(emblaApi);
    },
    // --- MODIFICATION: Use projectCount instead of featuredProjects ---
    [projectCount, tweenScale] // Only depends on projectCount and tweenScale now
  );

  // --- Original findEmblaHeight ---
  const findEmblaHeight = () => {
    const timer = setTimeout(() => {
      const emblaSlides = document.querySelectorAll(".embla__slide");
      const heights: number[] = [];
      // Only measure project slides for height calculation
      emblaSlides.forEach((slide, index) => {
        if (index < projectCount) {
          // Check index against project count
          heights.push(slide.getBoundingClientRect().height);
        }
      });

      if (heights.length > 0) {
        setEmblaHeight(Math.max(...heights));
      } else {
        // Fallback height if no project slides or calculation fails
        const finalSlide = emblaSlides[projectCount];
        setEmblaHeight(
          finalSlide ? finalSlide.getBoundingClientRect().height : 300
        );
      }
    }, 1000);

    return () => clearTimeout(timer);
  };

  // --- Original Grab Cursor Logic ---
  const addGrabCursor = () => {
    const emblaContainer = document.querySelector(".embla");
    emblaContainer?.classList.add("grabbing");
  };

  const removeGrabCursor = () => {
    const emblaContainer = document.querySelector(".embla");
    emblaContainer?.classList.remove("grabbing");
  };

  // --- Original useEffect Hooks ---
  useEffect(() => {
    if (!emblaApi) return;

    tweenScale(emblaApi); // Apply initial scale

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
  }, [emblaApi, tweenScale, onSelect]); // Dependencies from original code

  useEffect(() => {
    // Height calculation effect depends on emblaApi and projectCount
    if (emblaApi) {
      findEmblaHeight();
    }
    // Adding projectCount ensures height is recalculated if the number of projects changes
  }, [emblaApi, projectCount]);

  // --- Original Render Logic ---
  const currentProject = hasData ? featuredProjects[activeIndex] : null;

  return (
    <FeaturedProjectsWrapper
      $bg={currentProject?.featuredColour?.hex || heroBgColour?.hex}
    >
      {hasData && (
        <>
          <ContentBar>
            <LayoutWrapper>
              <ContentInner>
                <Title
                  $useWhiteLogo={
                    !!currentProject?.useWhiteFeaturedLogo || !currentProject
                  }
                >
                  {/* <LogoIcon /> */}
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -5, filter: "blur(3px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: 5, filter: "blur(3px)" }}
                    transition={{ duration: 0.5 }}
                  >
                    {currentProject?.featuredTagline || ""}
                  </motion.div>
                </Title>
                <Description
                  key={activeIndex}
                  initial={{ opacity: 0, x: -5, filter: "blur(3px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 5, filter: "blur(3px)" }}
                  transition={{ duration: 0.5 }}
                  $useWhiteLogo={
                    !!currentProject?.useWhiteFeaturedLogo || !currentProject
                  }
                >
                  {currentProject?.featuredDescription || ""}
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
                    data-cursor-title={
                      project?.comingSoon ? "Coming soon" : project?.title || ""
                    }
                    key={project?.slug?.current || `project-${i}`}
                    $isComingSoon={project?.comingSoon}
                  >
                    <MediaWrapper
                      $isActive={i === activeIndex}
                      className="embla__media-wrapper"
                    >
                      {project?.comingSoon ? (
                        project?.featuredThumbnail && (
                          <MediaStack
                            data={project?.featuredThumbnail}
                            isPriority={
                              i >= activeIndex - 1 && i <= activeIndex + 1
                            }
                            noAnimation
                            alt={project?.title || "Featured project thumbnail"}
                          />
                        )
                      ) : (
                        <Link
                          href={`/work/${project?.slug?.current}`}
                          legacyBehavior={false}
                        >
                          {project?.featuredThumbnail && (
                            <MediaStack
                              data={project?.featuredThumbnail}
                              isPriority={
                                i >= activeIndex - 1 && i <= activeIndex + 1
                              }
                              noAnimation
                              alt={
                                project?.title || "Featured project thumbnail"
                              }
                            />
                          )}
                        </Link>
                      )}
                    </MediaWrapper>
                  </EmblaSlide>
                ))}
                {/* Final Slide - Rendered after the map */}
                <EmblaSlide
                  className="embla__slide embla__slide--final"
                  key="final-slide"
                >
                  {/* Wrap in a div to ensure structure consistency if needed */}
                  {/* This slide will now be skipped by the tweenScale effect */}
                  <div>
                    <FeaturedFinalSlide />
                  </div>
                </EmblaSlide>
              </EmblaContainer>
            </Embla>
          </FeaturedGalleryWrapper>
        </>
      )}
    </FeaturedProjectsWrapper>
  );
};

export default FeaturedProjects;
