import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";
import { motion } from "framer-motion";

const AboutSectionWrapper = styled.section`
  padding: ${pxToRem(80)} 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(24)} 0 ${pxToRem(64)};

    .layout-grid {
      gap: ${pxToRem(64)};
    }
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

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    text-indent: ${pxToRem(80)};
    font-size: ${pxToRem(30)};
    line-height: ${pxToRem(35)};
  }
`;

const ImageWrapper = styled.div`
  grid-column: span 6;
  width: 100%;
  padding-top: 125%;
  position: relative;
  overflow: hidden;
  border-radius: ${pxToRem(5)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    order: 1;
  }
`;

const ImageInner = styled.div<{ $inView: boolean }>`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;

  img {
    transform: ${(props) => (props.$inView ? "scale(1)" : "scale(1.1)")};
    filter: ${(props) => (props.$inView ? "blur(0)" : "blur(5px)")};

    transition: all 1500ms var(--transition-ease);
    transition-delay: 0.5;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${(props) => (props.$inView ? "0%" : "100%")};
    background: var(--colour-white);
    z-index: 2;

    transition: all 1000ms var(--transition-ease);
    transition-delay: 0.5;
  }
`;

type Props = {
  data: StudioPageType["aboutSection"];
};

const AboutSection = (props: Props) => {
  const { data } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <AboutSectionWrapper>
      <LayoutWrapper>
        <LayoutGrid>
          <ContentWrapper>
            <Title
              initial={{ opacity: 0, x: -5, filter: "blur(3px)" }}
              animate={
                inView
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : { opacity: 0, x: -5, filter: "blur(3px)" }
              }
              transition={inView ? { duration: 0.5 } : undefined}
            >
              About
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
              {data?.aboutDescription && (
                <Description>{data.aboutDescription}</Description>
              )}
              {data?.aboutButtonTitle && data?.aboutButtonlink && (
                <Link href={data?.aboutButtonlink} target="_blank">
                  <PrimaryButtonLayout>
                    {data?.aboutButtonTitle}
                  </PrimaryButtonLayout>
                </Link>
              )}
            </DescriptionWrapper>
          </ContentWrapper>
          <ImageWrapper ref={ref}>
            {data?.aboutImage && (
              <ImageInner $inView={inView}>
                <Image
                  src={data?.aboutImage?.asset?.url}
                  alt="About image"
                  priority={false}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </ImageInner>
            )}
          </ImageWrapper>
        </LayoutGrid>
      </LayoutWrapper>
    </AboutSectionWrapper>
  );
};

export default AboutSection;
