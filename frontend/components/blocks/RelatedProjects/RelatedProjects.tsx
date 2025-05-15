import styled from "styled-components";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import { ProjectType } from "../../../shared/types/types";
import RelatedCard from "../RelatedCard";
import pxToRem from "../../../utils/pxToRem";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";
import Link from "next/link";
import { useState } from "react";

const RelatedProjectsWrapper = styled.section`
  margin-bottom: ${pxToRem(225)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(120)};
  }

  .layout-grid {
    grid-column-gap: ${pxToRem(20)};
    grid-row-gap: ${pxToRem(12)};
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: ${pxToRem(52)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(32)};
  }
`;

const Title = styled.h3``;

const DesktopButtonWrapper = styled.div`
  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const MobileButtonWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: block;
    padding-top: ${pxToRem(52)};
  }
`;

type Props = {
  data: ProjectType["relatedProjects"];
};

const RelatedProjects = (props: Props) => {
  const { data } = props;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const hasData = data?.length > 0;
  const anyHovered = hoveredIndex !== null;

  return (
    <RelatedProjectsWrapper>
      <LayoutWrapper>
        <Inner>
          <Title className="type-h1">Related projects</Title>
          <DesktopButtonWrapper>
            <Link href="/work">
              <PrimaryButtonLayout>Back to work</PrimaryButtonLayout>
            </Link>
          </DesktopButtonWrapper>
        </Inner>
        <LayoutGrid>
          {hasData &&
            data.map((item, i) => (
              <RelatedCard
                slug={item?.slug}
                defaultThumbnail={item?.defaultThumbnail}
                defaultThumbnailRatio={item?.defaultThumbnailRatio}
                defaultTagline={item?.defaultTagline}
                comingSoon={item?.comingSoon}
                isHovered={hoveredIndex === i}
                anyHovered={anyHovered}
                setIsHovered={(isHovered) =>
                  setHoveredIndex(isHovered ? i : null)
                }
                key={`related-${i}`}
              />
            ))}
        </LayoutGrid>
        <MobileButtonWrapper>
          <Link href="/work">
            <PrimaryButtonLayout>Back to work</PrimaryButtonLayout>
          </Link>
        </MobileButtonWrapper>
      </LayoutWrapper>
    </RelatedProjectsWrapper>
  );
};

export default RelatedProjects;
