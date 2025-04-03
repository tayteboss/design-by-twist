import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import pxToRem from "../../../utils/pxToRem";
import formatHTML from "../../../utils/formatHTML";

const StudioHeroWrapper = styled.section`
  background: var(--colour-black);
`;

const Inner = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${pxToRem(80)} 0;
`;

const Title = styled.div`
  * {
    color: var(--colour-white);
    font-size: ${pxToRem(70)};
    line-height: ${pxToRem(75)};
    font-family: var(--font-holise-extra-light);
    font-weight: 200;
    max-width: ${pxToRem(1200)};
    margin: 0 auto;
    text-align: center;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(50)};
      line-height: ${pxToRem(50)};
    }
  }
`;

type Props = {
  data: StudioPageType["heroSection"];
};

const StudioHero = (props: Props) => {
  const { data } = props;

  return (
    <StudioHeroWrapper>
      <LayoutWrapper>
        <Inner>
          {data?.heroDescription && (
            <Title
              dangerouslySetInnerHTML={{
                __html: formatHTML(data.heroDescription, "h1"),
              }}
            />
          )}
        </Inner>
      </LayoutWrapper>
    </StudioHeroWrapper>
  );
};

export default StudioHero;
