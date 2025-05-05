import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";
import pxToRem from "../../../utils/pxToRem";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

const RelatedCardWrapper = styled.div`
  grid-column: span 4;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }

  &:hover {
    .related-card__image-inner {
      filter: blur(12px);
    }

    .related-card__title-wrapper {
      opacity: 1;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: ${pxToRem(16)};
`;

const ImageInner = styled.div`
  border-radius: 5px;
  overflow: hidden;

  transition: all var(--transition-speed-default) var(--transition-ease);

  .media-wrapper {
    padding-top: 56%;
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

const TitleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: ${pxToRem(24)};
  transform: translateY(-50%);
  mix-blend-mode: difference;
  opacity: 0;

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Title = styled.p`
  color: var(--colour-white);
  margin-bottom: ${pxToRem(4)};
`;

const CategoriesWrapper = styled.div`
  display: flex;
  gap: ${pxToRem(4)};
`;

const CategoryCard = styled.div`
  background: var(--colour-white);
  color: var(--colour-black);
  font-size: ${pxToRem(11)};
  line-height: 1;
  padding: ${pxToRem(2)} ${pxToRem(4)};
  border-radius: ${pxToRem(4)};
  text-transform: capitalize;
`;

type Props = {
  title: ProjectType["relatedProjects"][number]["title"];
  slug: ProjectType["relatedProjects"][number]["slug"];
  defaultThumbnail: ProjectType["relatedProjects"][number]["defaultThumbnail"];
  defaultTagline: ProjectType["relatedProjects"][number]["defaultTagline"];
  categoryMediaAndTagline: ProjectType["relatedProjects"][number]["categoryMediaAndTagline"];
};

const RelatedCard = (props: Props) => {
  const {
    title,
    slug,
    defaultThumbnail,
    defaultTagline,
    categoryMediaAndTagline,
  } = props;

  const hasCategories = categoryMediaAndTagline?.length > 0;

  return (
    <RelatedCardWrapper>
      <Link href={`/work/${slug}`}>
        <ImageWrapper>
          <ImageInner className="related-card__image-inner">
            {defaultThumbnail && <MediaStack data={defaultThumbnail} />}
          </ImageInner>
          <TitleWrapper className="related-card__title-wrapper">
            {title && <Title className="type-h2">{title}</Title>}
            <CategoriesWrapper>
              {hasCategories &&
                categoryMediaAndTagline?.map(
                  (item) =>
                    item?.category && (
                      <CategoryCard key={item?.category}>
                        {item?.category.replace(/-/g, " ")}
                      </CategoryCard>
                    )
                )}
            </CategoriesWrapper>
          </TitleWrapper>
        </ImageWrapper>
        <ContentWrapper>
          {defaultTagline && <PortableText value={defaultTagline} />}
        </ContentWrapper>
      </Link>
    </RelatedCardWrapper>
  );
};

export default RelatedCard;
