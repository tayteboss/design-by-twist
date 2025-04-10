import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import MediaStack from "../../common/MediaStack";
// NEW: Import necessary hooks and throttle function
import { useState, useRef, useEffect, useCallback } from "react";
import { throttle } from "lodash"; // Or your preferred throttle/debounce library

// Styled Components (remain unchanged)
const PartnersSectionWrapper = styled.section`
  padding: ${pxToRem(80)} 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(24)} 0 ${pxToRem(64)};
  }
`;

const ContentWrapper = styled.div`
  grid-column: span 6;
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    order: 2;
  }
`;

const Title = styled(motion.h2)`
  position: absolute;
  top: ${pxToRem(10)};
  left: 0;
  font-size: ${pxToRem(15)};
  line-height: 1;
  font-family: var(--font-acid-grotesk-regular);
  text-transform: uppercase;
`;

const DescriptionWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${pxToRem(40)};
`;

const Description = styled.p`
  text-indent: ${pxToRem(140)};
  font-size: ${pxToRem(50)};
  line-height: ${pxToRem(56)};
  font-family: var(--font-holise-extra-light);
  font-weight: 200;
  max-width: ${pxToRem(1200)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    text-indent: ${pxToRem(100)};
    font-size: ${pxToRem(30)};
    line-height: ${pxToRem(35)};
  }
`;

const PartnersScroller = styled.div`
  padding-top: ${pxToRem(80)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  z-index: 2;
`;

const PartnerOuter = styled.div<{ $activeIndex: boolean }>`
  z-index: ${(props) => props.$activeIndex && "2"};

  a {
    transition: all 150ms var(--transition-ease);

    &:hover {
      color: var(--colour-foreground);

      & > div {
        // Target the Partner component inside the link
        opacity: 1;
        color: var(--colour-foreground);
      }
    }
  }
`;

const Partner = styled.div<{ $activeIndex: boolean }>`
  font-size: ${pxToRem(50)};
  line-height: ${pxToRem(56)};
  opacity: ${(props) => (props.$activeIndex ? "1" : "0.2")};
  transform: translateX(${(props) => (props.$activeIndex ? "20px" : "0px")});
  position: relative;
  cursor: pointer; // Add pointer cursor if it's linkable or interactive

  transition:
    opacity 50ms var(--transition-ease),
    color 50ms var(--transition-ease),
    transform 150ms var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(30)};
    line-height: ${pxToRem(37)};
    transform: translateX(${(props) => (props.$activeIndex ? "10px" : "0px")});
  }
`;

const PartnerMediaWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100%;
  pointer-events: none;
  z-index: 1;
`;

const ImageInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-20%, -50%);
  height: auto;
  width: 50vw;
  margin: 0 auto;
  background: var(--colour-white);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    left: unset;
    right: ${pxToRem(10)};
    transform: translateY(-50%);
  }

  .media-wrapper {
    padding-top: 56.25%;
    width: 100%;
    height: 100%;
  }
`;

const ImageMotion = styled(motion.div)`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
`;
// End Styled Components

type Props = {
  data: StudioPageType["partnersSection"];
};

const PartnersSection = (props: Props) => {
  const { data } = props;

  const [activeIndex, setActiveIndex] = useState(-1);
  // NEW: Initialize partnerRefs correctly
  const partnerRefs = useRef<(HTMLElement | null)[]>([]);

  // UseInView hook for the title/description animation (no changes needed here)
  const { ref: contentWrapperRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  const hasList = data?.partnersList && data.partnersList.length > 0;

  // Effect to ensure the refs array size matches the list size
  useEffect(() => {
    if (data?.partnersList) {
      partnerRefs.current = partnerRefs.current.slice(
        0,
        data.partnersList.length
      );
      // Initialize null entries if needed, though the ref callback handles assignment
      while (partnerRefs.current.length < data.partnersList.length) {
        partnerRefs.current.push(null);
      }
    } else {
      partnerRefs.current = [];
    }
  }, [data?.partnersList]);

  // NEW: Memoize the scroll handler function using useCallback
  const handleScroll = useCallback(() => {
    // Early exit if no list or refs array isn't ready (e.g., during unmount)
    if (!hasList || !partnerRefs.current || partnerRefs.current.length === 0) {
      if (activeIndex !== -1) setActiveIndex(-1); // Reset if currently active
      return;
    }

    let newActiveIndex = -1;
    let minDistance = Infinity;
    const center = window.innerHeight / 2;

    partnerRefs.current.forEach((element, index) => {
      // Check if the ref element actually exists
      if (element) {
        try {
          const rect = element.getBoundingClientRect();
          // Check if element is visible vertically before calculating center
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - center);

            // Threshold distance (e.g., 200px) to consider an item "active"
            if (distance <= 200 && distance < minDistance) {
              minDistance = distance;
              newActiveIndex = index;
            }
          }
        } catch (e) {
          // Safety net in case getBoundingClientRect fails during weird unmount timing
          console.warn(
            "Error accessing element dimensions, likely during unmount:",
            e
          );
        }
      }
    });

    // Only update state if the active index has actually changed
    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
    // Dependencies for useCallback: Recalculate only if these change.
  }, [hasList, activeIndex]); // Include activeIndex because we read it

  // NEW: Create a throttled version of the scroll handler
  // Adjust throttle time (e.g., 100ms) as needed for performance vs responsiveness
  const throttledScrollHandler = useRef(throttle(handleScroll, 100)).current;

  // NEW: Effect to add and remove the throttled scroll listener
  useEffect(() => {
    if (hasList) {
      window.addEventListener("scroll", throttledScrollHandler);
      // Run the handler once immediately on mount (or when list appears) without throttle
      handleScroll();
    }

    // Cleanup function: This runs when the component unmounts OR dependencies change
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      // Crucial: Cancel any pending throttled execution when unmounting
      throttledScrollHandler.cancel();
    };
    // Dependencies: Effect runs if hasList, handleScroll, or throttledScrollHandler changes.
    // handleScroll is memoized, throttledScrollHandler is stable via useRef.
  }, [hasList, handleScroll, throttledScrollHandler]);

  return (
    <PartnersSectionWrapper>
      <LayoutWrapper>
        {/* Use the specific ref for the content animation */}
        <ContentWrapper ref={contentWrapperRef}>
          <Title
            initial={{ opacity: 0, x: -5, filter: "blur(3px)" }}
            animate={
              contentInView // Use the correct inView variable
                ? { opacity: 1, x: 0, filter: "blur(0px)" }
                : { opacity: 0, x: -5, filter: "blur(3px)" }
            }
            transition={contentInView ? { duration: 0.5 } : undefined}
          >
            Partners
          </Title>
          <DescriptionWrapper
            initial={{ filter: "blur(10px)", opacity: 0 }}
            animate={
              contentInView // Use the correct inView variable
                ? { filter: "blur(0px)", opacity: 1 }
                : { filter: "blur(10px)" }
            }
            transition={
              contentInView ? { duration: 0.5, delay: 0.5 } : undefined
            }
          >
            {data?.partnersDescription && (
              <Description>{data.partnersDescription}</Description>
            )}
          </DescriptionWrapper>
        </ContentWrapper>
        <PartnersScroller>
          {hasList &&
            data?.partnersList.map((partner, i) => (
              <PartnerOuter key={i} $activeIndex={activeIndex === i}>
                {partner?.link ? (
                  <Link href={partner.link} passHref legacyBehavior>
                    {/* Apply the ref inside the Link */}
                    <Partner
                      as="a" // Render the Partner styled component as an 'a' tag for the Link
                      $activeIndex={activeIndex === i}
                      // NEW: Re-enable the ref assignment using the callback pattern
                      ref={(el: HTMLElement | null) => {
                        partnerRefs.current[i] = el;
                      }}
                    >
                      {partner?.title || ""}
                    </Partner>
                  </Link>
                ) : (
                  <Partner
                    $activeIndex={activeIndex === i}
                    // NEW: Re-enable the ref assignment using the callback pattern
                    ref={(el: HTMLElement | null) => {
                      partnerRefs.current[i] = el;
                    }}
                  >
                    {partner?.title || ""}
                  </Partner>
                )}
              </PartnerOuter>
            ))}
          <PartnerMediaWrapper>
            <ImageInner>
              {/* AnimatePresence for image transition - needs to be inside the list map or handled differently if it wraps the image */}
              {/* Assuming the key change on ImageMotion handles the transition */}
              <ImageMotion
                key={activeIndex} // Change key to trigger animation when activeIndex changes
                initial={{
                  opacity: 0,
                  y: -20,
                  scale: 0.99,
                  filter: "blur(3px)",
                }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20, scale: 0.99, filter: "blur(3px)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Render only when an item is active and data exists */}
                {activeIndex >= 0 &&
                  activeIndex < (data?.partnersList?.length || 0) &&
                  data?.partnersList[activeIndex]?.media && (
                    <MediaStack
                      data={data.partnersList[activeIndex].media}
                      noAnimation // Assuming MediaStack internal animations aren't needed here
                      sizes="50vw"
                    />
                  )}
              </ImageMotion>
            </ImageInner>
          </PartnerMediaWrapper>
        </PartnersScroller>
      </LayoutWrapper>
    </PartnersSectionWrapper>
  );
};

export default PartnersSection;
