import styled from "styled-components";
import { MediaType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import MediaStack from "../../common/MediaStack";

const FullMediaSectionWrapper = styled.section<{ $useSmallMb: boolean }>`
  margin-bottom: ${(props) => (props.$useSmallMb ? "20px" : "120px")};
`;

const MediaWrapper = styled.div<{ $isFullBleed?: boolean }>`
  width: 100%;

  .media-wrapper {
    padding-top: 56.25%;
    overflow: hidden;
    border-radius: ${(props) => (props.$isFullBleed ? "0px" : "5px;")};
  }
`;

type Props = {
  fullMedia: {
    isFullBleed: boolean;
    media: MediaType;
    useSmallMb: boolean;
  };
};

const FullMediaSection = (props: Props) => {
  const { fullMedia } = props;
  const { isFullBleed, media: oldMedia, useSmallMb } = fullMedia;

  const media = {
    media: oldMedia,
  };

  return (
    <FullMediaSectionWrapper $useSmallMb={useSmallMb}>
      {!isFullBleed && (
        <LayoutWrapper>
          <MediaWrapper>{media && <MediaStack data={media} />}</MediaWrapper>
        </LayoutWrapper>
      )}
      {isFullBleed && (
        <MediaWrapper $isFullBleed={true}>
          {media && <MediaStack data={media} />}
        </MediaWrapper>
      )}
    </FullMediaSectionWrapper>
  );
};

export default FullMediaSection;
