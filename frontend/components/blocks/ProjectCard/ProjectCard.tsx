import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import Link from "next/link";
import MediaStack from "../../common/MediaStack";
import { PortableText } from "@portabletext/react";
import pxToRem from "../../../utils/pxToRem";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ProjectCardWrapper = styled(motion.div)<{ $isHovered: boolean }>`
  width: 100%;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  margin-bottom: ${pxToRem(40)};
  filter: ${(props) => props.$isHovered && "blur(15px)"};
  position: relative;
  display: inline-block;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  transition: filter var(--transition-speed-default) var(--transition-ease);

  &:hover {
    filter: blur(0px) !important;
    opacity: 1 !important;

    a {
      opacity: 1 !important;
    }
  }

  a {
    opacity: ${(props) => props.$isHovered && "0.7"};

    transition: all var(--transition-speed-default) var(--transition-ease);
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
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
  slug: ProjectType["slug"];
  categoryMediaAndTagline: ProjectType["categoryMediaAndTagline"];
  defaultThumbnail: ProjectType["defaultThumbnail"];
  defaultThumbnailRatio: ProjectType["defaultThumbnailRatio"];
  defaultTagline: ProjectType["defaultTagline"];
  comingSoon: ProjectType["comingSoon"];
  isHovered: boolean;
  activeTag: string;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectCard = (props: Props) => {
  const {
    slug,
    categoryMediaAndTagline,
    defaultThumbnail,
    defaultThumbnailRatio,
    defaultTagline,
    isHovered,
    activeTag,
    comingSoon,
    setIsHovered,
  } = props;

  const [activeData, setActiveData] = useState({
    slug: slug.current,
    thumbnail: defaultThumbnail,
    thumbnailRatio: defaultThumbnailRatio,
    tagline: defaultTagline,
  });

  useEffect(() => {
    if (activeTag === "all") {
      setActiveData({
        slug: slug.current,
        thumbnail: defaultThumbnail,
        thumbnailRatio: defaultThumbnailRatio,
        tagline: defaultTagline,
      });
    } else {
      const foundCategory =
        categoryMediaAndTagline?.length > 0
          ? categoryMediaAndTagline.find(
              (category) => category.category === activeTag
            )
          : undefined;
      if (foundCategory) {
        setActiveData({
          slug: slug.current,
          thumbnail: foundCategory.thumbnail,
          thumbnailRatio: foundCategory.thumbnailRatio,
          tagline: foundCategory.Tagline,
        });
      }
    }
  }, [activeTag]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <ProjectCardWrapper
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      $isHovered={isHovered}
      variants={wrapperVariants}
      className={comingSoon ? "cursor-gallery__slide" : ""}
      data-cursor-title="Coming soon"
    >
      {comingSoon ? (
        <Inner
          ref={ref}
          className={`view-element-fade-in ${
            inView ? "view-element-fade-in--in-view" : ""
          }`}
        >
          <ImageWrapper $isPortrait={activeData.thumbnailRatio === "portrait"}>
            {comingSoon && <ComingSoon>Coming soon</ComingSoon>}
            <MediaStack
              data={activeData?.thumbnail}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </ImageWrapper>
          <ContentWrapper>
            {activeData.tagline && <PortableText value={activeData.tagline} />}
          </ContentWrapper>
        </Inner>
      ) : (
        <Link href={`/work/${activeData.slug}`}>
          <Inner
            ref={ref}
            className={`view-element-fade-in ${
              inView ? "view-element-fade-in--in-view" : ""
            }`}
          >
            <ImageWrapper
              $isPortrait={activeData.thumbnailRatio === "portrait"}
            >
              {comingSoon && <ComingSoon>Coming soon</ComingSoon>}
              <MediaStack
                data={activeData?.thumbnail}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </ImageWrapper>
            <ContentWrapper>
              {activeData.tagline && (
                <PortableText value={activeData.tagline} />
              )}
            </ContentWrapper>
          </Inner>
        </Link>
      )}
    </ProjectCardWrapper>
  );
};

export default ProjectCard;
