import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import formatHTML from "../../../utils/formatHTML";
import pxToRem from "../../../utils/pxToRem";
import { useInView } from "react-intersection-observer";
import AnimateTextLayout from "../../layout/AnimateTextLayout";
import Link from "next/link";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";

const HomeStudioWrapper = styled.section``;

const Inner = styled.div`
  padding: ${pxToRem(200)} 0 ${pxToRem(300)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(64)} 0 ${pxToRem(100)};
  }
`;

const Title = styled.h2`
  grid-column: 1 / 7;

  * {
    font-size: ${pxToRem(54)};
    line-height: ${pxToRem(55)};
    font-family: var(--font-holise-extra-light);
    font-weight: 200;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(35)};
      line-height: ${pxToRem(40)};
    }
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    margin-bottom: ${pxToRem(40)};
  }
`;

const DescriptionWrapper = styled.div`
  grid-column: 7 / -1;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }

  a {
    display: inline-block;

    @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
      display: block;
    }
  }
`;

const Description = styled.div`
  margin-bottom: ${pxToRem(40)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(64)};
  }
`;

type Props = {
  data: HomePageType["studioSection"];
};

const HomeStudio = (props: Props) => {
  const {
    data: { studioTitle, studioDescription },
  } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <HomeStudioWrapper>
      <LayoutWrapper>
        <Inner>
          <LayoutGrid>
            <Title ref={ref}>
              <AnimateTextLayout>{studioTitle || ""}</AnimateTextLayout>
            </Title>
            <DescriptionWrapper
              className={`view-element-bottom-top ${
                inView ? "view-element-bottom-top--in-view" : ""
              }`}
            >
              {studioDescription && (
                <Description
                  dangerouslySetInnerHTML={{
                    __html: formatHTML(studioDescription),
                  }}
                />
              )}
              <Link href="/studio">
                <PrimaryButtonLayout>Studio</PrimaryButtonLayout>
              </Link>
            </DescriptionWrapper>
          </LayoutGrid>
        </Inner>
      </LayoutWrapper>
    </HomeStudioWrapper>
  );
};

export default HomeStudio;
