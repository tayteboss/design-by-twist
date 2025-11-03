import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";
import { MediaType } from "../../../shared/types/types";
import useViewportWidth from "../../../hooks/useViewportWidth";

const MediaStackWrapper = styled.div``;

type Props = {
  data: MediaType;
  isPriority?: boolean;
  noAnimation?: boolean;
  sizes?: undefined | string;
  alt?: string;
  lazyLoad?: boolean;
  showAudioControls?: boolean;
  cursorRefresh?: () => void;
};

const MediaStack = (props: Props) => {
  const {
    data,
    isPriority = false,
    noAnimation = false,
    sizes = undefined,
    alt,
    lazyLoad = false,
    showAudioControls = false,
    cursorRefresh,
  } = props ?? {};

  const useVideo = data?.media?.mediaType === "video";
  const viewport = useViewportWidth();
  const isMobile = viewport === "mobile";

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "-5%",
  });

  return (
    <MediaStackWrapper ref={ref}>
      {useVideo && (
        <VideoComponent
          data={data}
          inView={inView}
          isPriority={isPriority}
          noAnimation={noAnimation}
          lazyLoad={lazyLoad}
          showAudioControls={data?.media?.showAudioControls}
          cursorRefresh={cursorRefresh}
          isMobile={isMobile}
        />
      )}
      {!useVideo && (
        <ImageComponent
          data={data}
          isPriority={isPriority}
          inView={inView}
          noAnimation={noAnimation}
          sizes={sizes}
          alt={alt}
          lazyLoad={lazyLoad}
          isMobile={isMobile}
        />
      )}
    </MediaStackWrapper>
  );
};

export default MediaStack;
