import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";
import { useInView } from "react-intersection-observer";
import Services from "../Services/Services";

const ServicesSectionWrapper = styled.section<{ $bg?: string }>`
  position: relative;
  z-index: 5;
  background: ${(props) => props.$bg || "var(--colour-white)"};
  padding: ${pxToRem(64)} 0;
`;

const ContentWrapper = styled.div`
  grid-column: span 6;
  position: relative;
  z-index: 10;

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
  font-family: var(--font-acid-grotesk-book);
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
  max-width: ${pxToRem(1600)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    text-indent: ${pxToRem(100)};
    font-size: ${pxToRem(30)};
    line-height: ${pxToRem(35)};
  }
`;

type Props = {
  data: StudioPageType["servicesSection"];
  cursorRefresh: () => void;
};

const ServicesSection = (props: Props) => {
  const { data, cursorRefresh } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <ServicesSectionWrapper ref={ref} $bg={data?.backgroundColour?.hex}>
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
            Services
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
            {data?.servicesTitle && (
              <Description>{data.servicesTitle}</Description>
            )}
          </DescriptionWrapper>
        </ContentWrapper>
      </LayoutWrapper>
      <Services data={data?.services} cursorRefresh={cursorRefresh} />
    </ServicesSectionWrapper>
  );
};

export default ServicesSection;
