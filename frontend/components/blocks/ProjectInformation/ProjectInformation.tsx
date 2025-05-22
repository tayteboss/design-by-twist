import styled from "styled-components";
import LayoutWrapper from "../../layout/LayoutWrapper";
import pxToRem from "../../../utils/pxToRem";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useClickOutside } from "../../../hooks/useClickOutside";

const ProjectInformationWrapper = styled.section`
  padding: ${pxToRem(40)} 0 ${pxToRem(110)};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const Title = styled.h1`
  font-size: ${pxToRem(60)};
  line-height: ${pxToRem(65)};
  font-family: var(--font-holise-extra-light);
  font-weight: 200;
  max-width: ${pxToRem(520)};
  margin-bottom: ${pxToRem(16)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(50)};
    line-height: ${pxToRem(50)};
  }
`;

const Trigger = styled.button`
  font-size: ${pxToRem(25)};
  line-height: ${pxToRem(30)};
  font-family: var(--font-acid-grotesk-book);

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(25)};
  }

  &:hover {
    opacity: 0.5;
  }
`;

const DescriptionWrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 26px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${pxToRem(12)} ${pxToRem(16)};
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 2;
`;

const DescriptionOuter = styled(motion.div)`
  max-width: ${pxToRem(640)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  padding: ${pxToRem(40)} 0 ${pxToRem(24)};

  * {
    font-size: ${pxToRem(21)};
    line-height: ${pxToRem(27)};
    font-family: var(--font-acid-grotesk-book);

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(20)};
      line-height: ${pxToRem(25)};
    }
  }
`;

const wrapperVariants = {
  hidden: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
    },
  },
};

const outerVariants = {
  hidden: {
    height: 0,
    width: "87px",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
  visible: {
    height: "auto",
    width: "100%",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      when: "beforeChildren",
    },
  },
};

const childVariants = {
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
    },
  },
};

type Props = {
  title?: string;
  description?: any[];
};

const ProjectInformation = (props: Props) => {
  const { title, description } = props;

  const [isActive, setIsActive] = useState(false);

  const ref = useRef<HTMLDivElement>(null!);
  useClickOutside(ref, () => {
    setIsActive(false);
  });

  return (
    <ProjectInformationWrapper>
      <LayoutWrapper>
        <Inner>
          <Title>{title || ""}</Title>
          <DescriptionWrapper
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            ref={ref}
          >
            <Trigger onClick={() => setIsActive(!isActive)}>
              {isActive ? "↑ close" : "↓ info"}
            </Trigger>
            <AnimatePresence>
              {isActive && (
                <>
                  {description && (
                    <DescriptionOuter
                      variants={outerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Description variants={childVariants}>
                        <PortableText value={description} />
                      </Description>
                    </DescriptionOuter>
                  )}
                </>
              )}
            </AnimatePresence>
          </DescriptionWrapper>
        </Inner>
      </LayoutWrapper>
    </ProjectInformationWrapper>
  );
};

export default ProjectInformation;
