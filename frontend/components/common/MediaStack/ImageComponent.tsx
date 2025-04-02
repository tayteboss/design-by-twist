import Image from "next/image";
import styled from "styled-components";
import { MediaType } from "../../../shared/types/types";
import { AnimatePresence, motion } from "framer-motion";

const ImageComponentWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background: var(--colour-cream);

  mux-player,
  img {
    object-fit: cover;
    transition: all var(--transition-speed-extra-slow) var(--transition-ease);
  }
`;

const InnerBlur = styled(motion.div)`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Inner = styled(motion.div)`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
`;

const wrapperVariants = {
  hidden: {
    opacity: 1,
    filter: "blur(2px)",
    scale: 1.05,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
};

const defaultVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
    scale: 1.05,
    transition: {
      duration: 0.75,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.75,
      ease: "easeInOut",
    },
  },
};

type Props = {
  data: MediaType;
  isPriority: boolean;
  inView: boolean;
};

const ImageComponent = (props: Props) => {
  const { data, isPriority, inView } = props;

  const imageUrl = data?.media?.image?.asset?.url;
  const blurDataURL = data?.media?.image?.asset?.metadata?.lqip;

  return (
    <ImageComponentWrapper className="media-wrapper">
      <AnimatePresence initial={false}>
        {(inView || isPriority) &&
          data?.media?.image?.asset?.metadata?.lqip && (
            <InnerBlur
              variants={wrapperVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Image
                src={blurDataURL}
                alt={data?.media?.image?.alt || ""}
                priority={isPriority}
                blurDataURL={blurDataURL}
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="50vw"
              />
            </InnerBlur>
          )}
      </AnimatePresence>
      <Inner
        variants={defaultVariants}
        initial="hidden"
        animate={inView || isPriority ? "visible" : "hidden"}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={data?.media?.image?.alt || ""}
            priority={isPriority}
            blurDataURL={blurDataURL}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </Inner>
    </ImageComponentWrapper>
  );
};

export default ImageComponent;
