import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useInView } from "react-intersection-observer";
import MediaStack from "../../common/MediaStack";

const ServiceCellWrapper = styled.div``;

const TopBar = styled.div`
  display: flex;
  margin-bottom: ${pxToRem(16)};
  cursor: pointer;
`;

const Title = styled.h3<{ $number: string; $isActive: boolean }>`
  font-size: 12vw;
  font-family: var(--font-acid-grotesk-book);
  line-height: 1;
  position: relative;
  text-transform: uppercase;
  opacity: ${(props) => (props.$isActive ? 1 : 0.1)};
  margin-left: ${(props) => (props.$isActive ? "5vw" : "0")};

  transition:
    opacity var(--transition-speed-default) var(--transition-ease),
    margin-left var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-left: 0;
    font-size: 15vw;
  }

  &:hover {
    opacity: ${(props) => (props.$isActive ? 1 : 0.3)};
    margin-left: 5vw;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      margin-left: 0;
    }
  }

  &::after {
    content: "${(props) => props.$number}";
    position: absolute;
    top: 2vw;
    left: calc(100% + 10px);
    font-size: ${pxToRem(20)};
    font-family: var(--font-holise-extra-light);
    font-weight: 200;
    opacity: ${(props) => (props.$isActive ? 1 : 0)};
  }
`;

const Description = styled(motion.p)<{ $isActive: boolean }>`
  font-size: ${pxToRem(20)};
  line-height: ${pxToRem(25)};
  font-family: var(--font-acid-grotesk-book);
  max-width: ${pxToRem(550)};
  margin-bottom: ${pxToRem(64)};
  margin-left: 5vw;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-left: 0;
    margin-bottom: ${pxToRem(32)};
  }

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const BottomBar = styled(motion.div)``;

const BottomInner = styled(motion.div)`
  padding-bottom: ${pxToRem(20)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-bottom: ${pxToRem(32)};
  }
`;

const Embla = styled.div`
  overflow: hidden;
`;

const EmblaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(20)};
  margin-left: ${pxToRem(40)};
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-left: 0;
  }

  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  img {
    transition: all var(--transition-speed-slow) var(--transition-ease);
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-left: ${pxToRem(16)};
  }
`;

const EmblaSlide = styled.div`
  flex: 0 0 17vw;
  min-width: 0;
  position: relative;
  transform-origin: center center;

  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1); /* Adjust timing as needed */

  @media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
    flex: 0 0 19vw;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    flex: 0 0 24vw;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    flex: 0 0 32vw;
  }

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    flex: 0 0 70vw;
  }
`;

const ImageRatio = styled(motion.div)`
  width: 100%;
  padding-top: 56.25%;
  position: relative;
`;

const ImageInner = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;

  * {
    height: 100%;
    width: 100%;
  }
`;

const ImageCaption = styled.p`
  padding-top: ${pxToRem(4)};
  font-size: ${pxToRem(15)};
  line-height: ${pxToRem(20)};
  font-family: var(--font-acid-grotesk-book);
  text-transform: uppercase;
`;

const wrapperVariants = {
  hidden: {
    height: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
  visible: {
    height: "auto",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "beforeChildren",
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.01,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.01,
      ease: "easeInOut",
      staggerChildren: 0.1,
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    x: -5,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  title: StudioPageType["servicesSection"]["services"][0]["title"];
  description: StudioPageType["servicesSection"]["services"][0]["description"];
  images: StudioPageType["servicesSection"]["services"][0]["images"];
  isActive: boolean;
  setIndexActive: (index: number) => void;
  index: number;
};

const ServiceCell = (props: Props) => {
  const { title, description, images, isActive, setIndexActive, index } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: true,
    startIndex: 0,
    skipSnaps: true,
    watchResize: false,
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  const hasImages = images && images.length > 0;

  return (
    <ServiceCellWrapper
      ref={ref}
      className={`view-element-fade-in ${
        inView ? "view-element-fade-in--in-view" : ""
      }`}
    >
      <LayoutWrapper>
        <TopBar onClick={() => setIndexActive(index)}>
          <Title $number={`0${index + 1}`} $isActive={isActive}>
            {title || ""}
          </Title>
        </TopBar>
      </LayoutWrapper>
      <AnimatePresence>
        {isActive && (
          <BottomBar
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <BottomInner variants={childVariants}>
              <LayoutWrapper>
                <Description $isActive={isActive}>
                  {description || ""}
                </Description>
              </LayoutWrapper>
              <Embla className="embla" ref={emblaRef}>
                <EmblaContainer className="embla__container cursor-gallery">
                  {hasImages &&
                    images.map((image, i) => (
                      <EmblaSlide className="embla__slide" key={i}>
                        <ImageRatio variants={imageVariants}>
                          <ImageInner>
                            <MediaStack data={image?.media} sizes={"20vw"} />
                          </ImageInner>
                        </ImageRatio>
                        {image?.caption && (
                          <ImageCaption>{image?.caption}</ImageCaption>
                        )}
                      </EmblaSlide>
                    ))}
                </EmblaContainer>
              </Embla>
            </BottomInner>
          </BottomBar>
        )}
      </AnimatePresence>
    </ServiceCellWrapper>
  );
};

export default ServiceCell;
