import styled from "styled-components";
import { MediaType } from "../../../shared/types/types";
import ProjectColumn from "../ProjectColumn";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";

const TwoColumnMediaWrapper = styled.section<{ $useSmallMb: boolean }>`
  margin-bottom: ${(props) => (props.$useSmallMb ? "20px" : "120px")};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${(props) => (props.$useSmallMb ? "12px" : "32px")};
    margin-bottom: ${pxToRem(12)};
  }

  .layout-grid {
    grid-column-gap: ${pxToRem(20)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      grid-column-gap: ${pxToRem(12)};
      grid-row-gap: ${pxToRem(12)};
    }
  }
`;

type ColumnType = {
  media: MediaType;
  useFullHeight?: boolean;
};

type Props = {
  twoColumnMedia: {
    useSmallMb: boolean;
    media: MediaType;
    leftColumn: ColumnType[];
    rightColumn: ColumnType[];
  };
};

const TwoColumnMedia = (props: Props) => {
  const { twoColumnMedia } = props;
  const { leftColumn, rightColumn, useSmallMb } = twoColumnMedia;

  const hasLeftColumn = leftColumn?.length > 0;
  const hasRightColumn = rightColumn?.length > 0;

  const leftColumnLength = leftColumn?.length || 0;
  const rightColumnLength = rightColumn?.length || 0;

  if (leftColumnLength === 1 && rightColumnLength === 2) {
    leftColumn[0].useFullHeight = true;
  } else if (leftColumnLength === 2 && rightColumnLength === 1) {
    rightColumn[0].useFullHeight = true;
  }

  return (
    <TwoColumnMediaWrapper $useSmallMb={useSmallMb}>
      <LayoutWrapper>
        <LayoutGrid>
          {hasLeftColumn && <ProjectColumn data={leftColumn} />}
          {hasRightColumn && <ProjectColumn data={rightColumn} />}
        </LayoutGrid>
      </LayoutWrapper>
    </TwoColumnMediaWrapper>
  );
};

export default TwoColumnMedia;
