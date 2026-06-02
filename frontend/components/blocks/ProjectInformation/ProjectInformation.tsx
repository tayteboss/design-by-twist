import styled from "styled-components";
import LayoutWrapper from "../../layout/LayoutWrapper";
import pxToRem from "../../../utils/pxToRem";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import LayoutGrid from "../../layout/LayoutGrid";

const ProjectInformationWrapper = styled.section`
  padding: ${pxToRem(40)} 0 ${pxToRem(110)};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  .layout-grid {
    row-gap: ${pxToRem(24)};
  }
`;

const Title = styled.h1`
  font-size: ${pxToRem(120)};
  line-height: ${pxToRem(125)};
  font-family: var(--font-holise-extra-light);
  font-weight: 200;
  margin-bottom: ${pxToRem(80)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(50)};
    line-height: ${pxToRem(50)};
  }
`;

const DescriptionWrapper = styled.div`
  * {
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(25)};
    font-family: var(--font-acid-grotesk-book);

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(20)};
      line-height: ${pxToRem(25)};
    }
  }

  a {
    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

const DescriptionOuter = styled.div`
  grid-column: 5 / 12;

  
  @media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
    grid-column: 1 / -1;
    order: 1;
  }
`;

const Description = styled.div``;

const CreditsOuter = styled.div`
  grid-column: 1 / 5;

  @media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
    grid-column: 1 / -1;
    order: 2;
  }
`;

const Credits = styled.div``;

type Props = {
  title?: string;
  description?: any[];
  credits?: any[];
};

const ProjectInformation = (props: Props) => {
  const { title, description, credits } = props;

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
          <DescriptionWrapper ref={ref}>
            <LayoutGrid>
            {credits && (
              <CreditsOuter className="content">
                <Credits>
                  <PortableText value={credits} />
                </Credits>
              </CreditsOuter>
            )}
            {description && (
              <DescriptionOuter className="content">
                <Description>
                  <PortableText value={description} />
                </Description>
              </DescriptionOuter>
            )}
            </LayoutGrid>
          </DescriptionWrapper>
        </Inner>
   
      </LayoutWrapper>
    </ProjectInformationWrapper>
  );
};

export default ProjectInformation;
