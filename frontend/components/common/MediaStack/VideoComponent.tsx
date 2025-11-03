import MuxPlayer from "@mux/mux-player-react/lazy";
import styled from "styled-components";
import { MediaType } from "../../../shared/types/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import UnMuteIcon from "../../svgs/UnMuteIcon";
import MuteIcon from "../../svgs/MuteIcon";

const VideoComponentWrapper = styled.div`
  position: relative;
  overflow: hidden;

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  mux-player,
  img {
    transition: all var(--transition-speed-extra-slow) var(--transition-ease);
  }

  &:hover {
    .icon-wrapper {
      opacity: 1;
    }
  }
`;

const InnerBlur = styled(motion.div)`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Inner = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 48px;
  width: 48px;
  opacity: 0;
  transition: all var(--transition-speed-extra-slow) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 36px;
    height: 36px;
    top: 10px;
    right: 10px;
  }

  svg {
    width: 27px;
    height: 27px;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      width: 20px;
      height: 20px;
    }
  }
`;

type Props = {
  data: MediaType;
  inView: boolean;
  isPriority: boolean;
  noAnimation?: boolean;
  lazyLoad?: boolean;
  showAudioControls?: boolean;
  cursorRefresh?: () => void;
  isMobile?: boolean;
};

const VideoComponent = (props: Props) => {
  const {
    data,
    inView,
    isPriority,
    noAnimation,
    lazyLoad,
    showAudioControls,
    cursorRefresh,
    isMobile,
  } = props;

  const [isMuted, setIsMuted] = useState(true);

  const playbackId = data?.media?.video?.asset?.playbackId;
  const posterUrl = `https://image.mux.com/${data?.media?.video?.asset?.playbackId}/thumbnail.png?width=214&height=121&time=1`;

  const wrapperVariants = {
    hidden: {
      opacity: 1,
      filter: isMobile ? "blur(0px)" : "blur(10px)",
      scale: 1.05,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  return (
    <VideoComponentWrapper
      className={`media-wrapper`}
      onClick={() => {
        setIsMuted(!isMuted);
        cursorRefresh?.();
      }}
    >
      {showAudioControls && (
        <IconWrapper className="icon-wrapper">
          {isMuted ? <UnMuteIcon /> : <MuteIcon />}
        </IconWrapper>
      )}
      {!noAnimation && posterUrl && (
        <AnimatePresence initial={false}>
          {inView && playbackId && (
            <InnerBlur
              variants={wrapperVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Image
                src={`${posterUrl}`}
                alt={""}
                fill
                priority={isPriority}
                sizes="50vw"
              />
            </InnerBlur>
          )}
        </AnimatePresence>
      )}
      {playbackId && (
        <Inner>
          <MuxPlayer
            streamType="on-demand"
            playbackId={playbackId}
            autoPlay="muted"
            loop={true}
            thumbnailTime={1}
            loading={lazyLoad ? "viewport" : "page"}
            preload="auto"
            muted={isMuted}
            playsInline={true}
            poster={`${posterUrl}`}
            minResolution="2160p"
          />
        </Inner>
      )}
    </VideoComponentWrapper>
  );
};

export default VideoComponent;
