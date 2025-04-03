import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import MediaStack from "../../common/MediaStack";
import { useState, useRef, useEffect, useCallback } from "react";

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
    text-indent: ${pxToRem(80)};
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
`;

const Partner = styled.p<{ $activeIndex: boolean }>`
  font-size: ${pxToRem(50)};
  line-height: ${pxToRem(56)};
  opacity: ${(props) => (props.$activeIndex ? "1" : "0.2")};
  transform: translateX(${(props) => (props.$activeIndex ? "20px" : "0px")});
  transition:
    opacity 50ms var(--transition-ease),
    transform 150ms var(--transition-ease);
  position: relative;
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
  transform: translate(-50%, -50%);
  height: auto;
  width: 50vw;
  margin: 0 auto;
  background: var(--colour-white);

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

type Props = {
  data: StudioPageType["partnersSection"];
};

const PartnersSection = (props: Props) => {
  const { data } = props;

  const [activeIndex, setActiveIndex] = useState(-1);
  const partnerRefs = useRef<HTMLElement[]>([]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  const hasList = data?.partnersList && data.partnersList.length > 0;

  useEffect(() => {
    partnerRefs.current = partnerRefs.current.slice(
      0,
      data?.partnersList?.length || 0
    );
  }, [data?.partnersList]);

  const handleScroll = useCallback(() => {
    if (!hasList) {
      setActiveIndex(-1);
      return;
    }

    let newActiveIndex = -1;
    let minDistance = Infinity;
    const center = window.innerHeight / 2;

    partnerRefs.current.forEach((element, index) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - center);

        if (distance <= 200 && distance < minDistance) {
          minDistance = distance;
          newActiveIndex = index;
        }
      }
    });

    setActiveIndex(newActiveIndex);
  }, [hasList]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <PartnersSectionWrapper>
      <LayoutWrapper>
        <ContentWrapper ref={ref}>
          <Title
            initial={{ opacity: 0, x: -5, filter: "blur(3px)" }}
            animate={
              inView
                ? { opacity: 1, x: 0, filter: "blur(0px)" }
                : { opacity: 0, x: -5, filter: "blur(3px)" }
            }
            transition={inView ? { duration: 0.5 } : undefined}
          >
            Partners
          </Title>
          <DescriptionWrapper
            initial={{ filter: "blur(10px)", opacity: 0 }}
            animate={
              inView
                ? { filter: "blur(0px)", opacity: 1 }
                : { filter: "blur(10px)" }
            }
            transition={inView ? { duration: 0.5, delay: 0.5 } : undefined}
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
                <Link href="/tooooobeeeefilllleded">
                  <Partner
                    $activeIndex={activeIndex === i}
                    ref={(el) => (partnerRefs.current[i] = el as HTMLElement)}
                  >
                    {partner?.title || ""}
                  </Partner>
                </Link>
              </PartnerOuter>
            ))}
          <PartnerMediaWrapper>
            <ImageInner>
              <ImageMotion
                key={activeIndex}
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.99,
                  filter: "blur(3px)",
                }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, scale: 0.99, filter: "blur(3px)" }}
                transition={{ duration: 0.3 }}
              >
                {activeIndex >= 0 && data?.partnersList[activeIndex]?.media && (
                  <MediaStack
                    data={data?.partnersList[activeIndex]?.media}
                    noAnimation
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
