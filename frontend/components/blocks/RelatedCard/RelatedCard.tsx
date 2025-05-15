import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";
import pxToRem from "../../../utils/pxToRem";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { motion } from "framer-motion";

const RelatedCardWrapper = styled(motion.div)<{
  $isHovered: boolean;
  $anyHovered: boolean;
}>`
  grid-column: span 4;
  width: 100%;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  margin-bottom: ${pxToRem(40)};
  filter: ${(props) =>
    props.$anyHovered && !props.$isHovered ? "blur(15px)" : "none"};
  position: relative;

  transition: filter var(--transition-speed-default) var(--transition-ease);

  &:hover {
    filter: blur(0px) !important;
    opacity: 1 !important;

    a {
      opacity: 1 !important;
    }
  }

  a {
    opacity: ${(props) =>
      props.$anyHovered && !props.$isHovered ? "0.7" : "1"};
    transition: all var(--transition-speed-default) var(--transition-ease);
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    margin-bottom: ${pxToRem(24)};
    filter: none !important;
  }
`;

const Inner = styled.div``;

const ImageWrapper = styled.div<{ $isPortrait: boolean }>`
  margin-bottom: ${pxToRem(12)};
  overflow: hidden;
  border-radius: 5px;
  position: relative;

  .media-wrapper {
    padding-top: ${(props) => (props.$isPortrait ? "110%" : "56%")};
  }
`;

const ContentWrapper = styled.div`
  * {
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(24)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(14)};
      line-height: ${pxToRem(16)};
    }
  }
`;

const ComingSoon = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  z-index: 2;
  border-radius: 4px;
  background: var(--colour-foreground);
  color: var(--colour-black);
  font-size: ${pxToRem(12)};
  line-height: 1;
  padding: ${pxToRem(3)} ${pxToRem(5)};
  white-space: nowrap;
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: block;
  }
`;

const wrapperVariants = {
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
  slug: ProjectType["relatedProjects"][number]["slug"];
  defaultThumbnail: ProjectType["relatedProjects"][number]["defaultThumbnail"];
  defaultThumbnailRatio: ProjectType["relatedProjects"][number]["defaultThumbnailRatio"];
  defaultTagline: ProjectType["relatedProjects"][number]["defaultTagline"];
  isHovered: boolean;
  anyHovered: boolean;
  comingSoon: ProjectType["relatedProjects"][number]["comingSoon"];
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
};

const RelatedCard = (props: Props) => {
  const {
    slug,
    defaultThumbnail,
    defaultThumbnailRatio,
    defaultTagline,
    isHovered,
    anyHovered,
    comingSoon,
    setIsHovered,
  } = props;

  return (
    <RelatedCardWrapper
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      $isHovered={isHovered}
      $anyHovered={anyHovered}
      variants={wrapperVariants}
    >
      <Link href={`/work/${slug?.current}`}>
        <Inner>
          <ImageWrapper $isPortrait={defaultThumbnailRatio === "portrait"}>
            {comingSoon && <ComingSoon>Coming soon</ComingSoon>}
            {defaultThumbnail && (
              <MediaStack
                data={defaultThumbnail}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            )}
          </ImageWrapper>
          <ContentWrapper>
            {defaultTagline && <PortableText value={defaultTagline} />}
          </ContentWrapper>
        </Inner>
      </Link>
    </RelatedCardWrapper>
  );
};

export default RelatedCard;
