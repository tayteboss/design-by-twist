import styled, { css } from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LogoIcon from "../../svgs/LogoIcon";
import { useCallback, useEffect, useRef, useState } from "react";
import pxToRem from "../../../utils/pxToRem";
import MediaStack from "../../common/MediaStack";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

const FeaturedProjectsWrapper = styled.section<{ $bg: string }>`
  background-color: ${(props) => props.$bg};
  transition: all var(--transition-speed-slow) var(--transition-ease);
`;

const ContentBar = styled.div``;

const ContentInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: ${pxToRem(24)} 0;
  gap: ${pxToRem(24)};
`;

const Title = styled.h2`
  font-size: ${pxToRem(50)};
  line-height: ${pxToRem(50)};
  font-family: var(--font-holise-extra-light);
  font-weight: 200;
  display: flex;
  align-items: start;
  gap: ${pxToRem(16)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(35)};
    line-height: ${pxToRem(40)};
  }

  svg {
    position: relative;
    top: 4px;
    width: ${pxToRem(120)};
    height: auto;
  }
`;

const Description = styled.p`
  font-size: ${pxToRem(20)};
  line-height: ${pxToRem(17)};
  text-align: right;
`;

const FeaturedGalleryWrapper = styled.div`
  padding: ${pxToRem(50)} 0 ${pxToRem(120)};
  overflow: hidden;
`;

const Embla = styled.div`
  overflow: hidden;
`;

const EmblaContainer = styled.div<{ $height: number }>`
  display: flex;
  align-items: center;
  height: ${(props) => props.$height}px;
`;

const EmblaSlide = styled.div<{ $isActive: boolean }>`
  min-width: 0;
  position: relative;
  transform-origin: center center;
  flex: 0 0 29vw;
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
`;

const MediaWrapper = styled.div<{ $isActive: boolean }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${pxToRem(8)};
  transform-origin: center center;
  transition: padding-top 1s cubic-bezier(0.23, 1, 0.32, 1);

  & > * {
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

  const startIndex = 2;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: false,
    startIndex: startIndex,
    skipSnaps: true,
  });

  const [activeIndex, setActiveIndex] = useState(startIndex);

  const [emblaHeight, setEmblaHeight] = useState(0);

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
        let scale = 0.4;

        let paddingTop = 56.25;

        if (absoluteDiff < 1) {
          scale = 1.0 - absoluteDiff * (1.0 - 0.3);
          paddingTop = absoluteDiff < 0.05 ? 125 : 56.25;
        } else if (absoluteDiff < 2) {
          scale = 0.3 - (absoluteDiff - 1) * (0.3 - 0.5);
          paddingTop = 56.25;
        }

        const finalScale = numberWithinRange(scale, 0.1, 1.0).toString();
        const finalPaddingTop = numberWithinRange(
          paddingTop,
          56.25,
          125
        ).toString();

        const slideNode = scaleNodes.current[snapIndex];

        if (slideNode) {
          window.requestAnimationFrame(() => {
            slideNode.style.transform = `scale(${finalScale})`;
            slideNode.style.zIndex = absoluteDiff < 0.5 ? "1" : "0";

            if (slideNode.firstElementChild) {
              (slideNode.firstElementChild as HTMLElement).style.paddingTop =
                `${finalPaddingTop}%`;
            }
          });
        }
      });
    },
    [numberWithinRange]
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

  useEffect(() => {
    if (!emblaApi) return;

    tweenScale(emblaApi);

    emblaApi
      .on("select", onSelect)
      .on("scroll", tweenScale)
      .on("reInit", tweenScale);

    return () => {
      emblaApi
        .off("select", onSelect)
        .off("scroll", tweenScale)
        .off("reInit", tweenScale);
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
                <Title>
                  <LogoIcon />
                  {featuredProjects[activeIndex]?.featuredTagline || ""}
                </Title>
                <Description>
                  {featuredProjects[activeIndex]?.featuredDescription || ""}
                </Description>
              </ContentInner>
            </LayoutWrapper>
          </ContentBar>
          <FeaturedGalleryWrapper>
            <Embla className="embla" ref={emblaRef}>
              <EmblaContainer
                className="embla__container"
                $height={emblaHeight}
              >
                {featuredProjects.map((project, i) => (
                  <EmblaSlide
                    className="embla__slide"
                    key={i}
                    $isActive={i === activeIndex}
                  >
                    <MediaWrapper
                      $isActive={i === activeIndex}
                      className="embla__media-wrapper"
                    >
                      <MediaStack
                        data={project?.defaultThumbnail}
                        isPriority={
                          i >= activeIndex - 1 && i <= activeIndex + 1
                        }
                      />
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
