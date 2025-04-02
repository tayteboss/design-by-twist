import styled, { css } from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import { useCallback, useEffect, useRef, useState } from "react";
import pxToRem from "../../../utils/pxToRem";
import MediaStack from "../../common/MediaStack";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

const FeaturedGalleryWrapper = styled.div`
  padding: ${pxToRem(24)} 0 ${pxToRem(120)};
  overflow: hidden;
`;

const Embla = styled.div`
  overflow: hidden;
`;

const EmblaContainer = styled.div`
  display: flex;
  align-items: center;
  height: 420px;
`;

const EmblaSlide = styled.div<{ $isActive: boolean }>`
  flex: ${(props) => (props.$isActive ? "0 0 35vw" : "0 0 25vw")};
  min-width: 0;
  margin-right: ${pxToRem(20)};
  position: relative;
  transform-origin: center center;

  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1); /* Adjust timing as needed */
`;

// --- MediaWrapper with Transition ---
const MediaWrapper = styled.div<{ $isActive: boolean }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${pxToRem(8)};
  /* Default: Landscape (16:9) */
  padding-top: ${(9 / 16) * 100}%;
  transform-origin: center center;

  /* Add transition for padding-top */
  transition: padding-top 1s cubic-bezier(0.23, 1, 0.32, 1); /* Adjust timing as needed */

  /* Conditional: Portrait for active slide (3:4) */
  ${({ $isActive }) =>
    $isActive &&
    css`
      padding-top: 114%;
    `}

  /* Ensure inner content scales correctly */
   & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;

    /* Apply these styles directly to img/video or a wrapper */
    img,
    video,
    .media-wrapper {
      /* Targeting class based on user feedback */
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

type Props = {
  featuredProjects: HomePageType["featuredProjectsSection"]["featuredProjects"];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const FeaturedGallery = (props: Props) => {
  const { featuredProjects, activeIndex, setActiveIndex } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: false,
    startIndex: activeIndex,
    slidesToScroll: 1,
  });

  const [internalActiveIndex, setInternalActiveIndex] = useState(activeIndex); // Added internal state

  const numberWithinRange = (
    number: number,
    min: number,
    max: number
  ): number => Math.min(Math.max(number, min), max);

  const scaleNodes = useRef<HTMLElement[]>([]);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();

      scaleNodes.current = emblaApi.slideNodes();

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        const diffToTarget = scrollSnap - scrollProgress;
        const absoluteDiff = Math.abs(diffToTarget);
        let scale = 0.4; // Min scale for slides >= 2 steps away

        // Interpolate scale: 1.0 (center) -> 0.5 (adjacent) -> 0.4 (outer)
        if (absoluteDiff < 1) {
          scale = 1.0 - absoluteDiff * (1.0 - 0.5);
        } else if (absoluteDiff < 2) {
          scale = 0.5 - (absoluteDiff - 1) * (0.5 - 0.4);
        }

        const finalScale = numberWithinRange(scale, 0.4, 1.0).toString();
        const slideNode = scaleNodes.current[snapIndex];

        if (slideNode) {
          // Apply transform in next animation frame for potential smoothness
          window.requestAnimationFrame(() => {
            slideNode.style.transform = `scale(${finalScale})`;
            slideNode.style.zIndex = absoluteDiff < 0.5 ? "1" : "0";
          });
        }
      });
    },
    [numberWithinRange]
  );

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      setInternalActiveIndex(selectedIndex); // Update internal state
      // setActiveIndex(selectedIndex); //Update parent state.
      tweenScale(emblaApi, "select"); // Ensure scale is updated on select
    },
    [setActiveIndex, tweenScale]
  );

  useEffect(() => {
    if (!emblaApi) return;

    tweenScale(emblaApi); // Initial scale calculation

    emblaApi
      .on("select", onSelect)
      .on("scroll", tweenScale)
      .on("reInit", tweenScale);

    return () => {
      // Cleanup listeners
      emblaApi
        .off("select", onSelect)
        .off("scroll", tweenScale)
        .off("reInit", tweenScale);
    };
  }, [emblaApi, tweenScale, onSelect]);

  return (
    <FeaturedGalleryWrapper>
      <Embla className="embla" ref={emblaRef}>
        <EmblaContainer className="embla__container">
          {featuredProjects.map((project, i) => (
            <EmblaSlide className="embla__slide" key={i}>
              <MediaWrapper>
                <MediaStack
                  data={project?.defaultThumbnail}
                  isPriority={
                    i >= internalActiveIndex - 1 && i <= internalActiveIndex + 1
                  } //Use Internal state.
                />
              </MediaWrapper>
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </Embla>
    </FeaturedGalleryWrapper>
  );
};

export default FeaturedGallery;
