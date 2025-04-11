import styled from "styled-components";
import { MediaType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";
import pxToRem from "../../../utils/pxToRem";

const ProjectColumnWrapper = styled.div`
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(20)};
  height: 100%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    gap: ${pxToRem(12)};
  }
`;

const MediaWrapper = styled.div<{ $isMulti: boolean; $isFullHeight?: boolean }>`
  width: 100%;
  height: 100%;

  & > div {
    height: 100%;
  }

  .media-wrapper {
    overflow: hidden;
    border-radius: 5px;
    padding-top: ${(props) =>
      props.$isFullHeight ? "unset" : props.$isMulti ? "55%" : "114%"};
    height: 100%;
  }
`;

type Props = {
  data: MediaType[];
};

const ProjectColumn = (props: Props) => {
  const { data } = props;

  const hasData = data?.length > 0;
  const isMulti = data?.length > 1;

  return (
    <ProjectColumnWrapper>
      {hasData &&
        data.map((item, i) => {
          const media = {
            media: item,
          };

          return (
            <MediaWrapper
              $isMulti={isMulti}
              $isFullHeight={item?.useFullHeight}
              key={`project-col-${i}`}
            >
              <MediaStack data={media} />
            </MediaWrapper>
          );
        })}
    </ProjectColumnWrapper>
  );
};

export default ProjectColumn;
