import styled from "styled-components";
import LayoutWrapper from "../../layout/LayoutWrapper";
import pxToRem from "../../../utils/pxToRem";
import { useState } from "react";
import formatHTML from "../../../utils/formatHTML";
import { AnimatePresence, motion } from "framer-motion";

const ProjectInformationWrapper = styled.section`
  padding: ${pxToRem(40)} 0;
`;

const Inner = styled.div``;

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
  font-family: var(--font-acid-grotesk-regular);

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(35)};
  }

  &:hover {
    opacity: 0.5;
  }
`;

const DescriptionWrapper = styled(motion.div)``;

const Description = styled(motion.div)`
  padding-bottom: ${pxToRem(40)};
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    height: 0,
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
  description?: string;
};

const ProjectInformation = (props: Props) => {
  const { title, description } = props;

  const [isActive, setIsActive] = useState(false);

  return (
    <ProjectInformationWrapper>
      <LayoutWrapper>
        <Inner>
          <Title>{title || ""}</Title>
          <AnimatePresence>
            {isActive && (
              <DescriptionWrapper
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {description && (
                  <Description
                    variants={childVariants}
                    dangerouslySetInnerHTML={{
                      __html: formatHTML(description),
                    }}
                  />
                )}
              </DescriptionWrapper>
            )}
          </AnimatePresence>
          <Trigger onClick={() => setIsActive(!isActive)}>
            {isActive ? "-close" : "+info"}
          </Trigger>
        </Inner>
      </LayoutWrapper>
    </ProjectInformationWrapper>
  );
};

export default ProjectInformation;
