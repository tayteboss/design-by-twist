import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import pxToRem from "../../../utils/pxToRem";

const QuoteWrapper = styled.div`
  padding-top: ${pxToRem(120)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-top: ${pxToRem(40)};
  }
`;

const Inner = styled.div<{ $textColour: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToRem(64)};
  max-width: ${pxToRem(1000)};
  margin: 0 auto;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    gap: ${pxToRem(36)};
  }

  * {
    color: ${({ $textColour }) => $textColour};
  }
`;

const QuoteText = styled.blockquote`
  font-family: var(--font-holise-extra-light);
  font-size: ${pxToRem(48)};
  line-height: 1.2;
  text-align: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(27)};
    /* line-height: ${pxToRem(31)}; */
  }
`;

const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuthorName = styled.p`
  text-align: center;
  font-family: var(--font-acid-grotesk-bold);
  font-size: ${pxToRem(20)};
  line-height: 1.2;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(15)};
  }
`;

const AuthorRole = styled.p`
  text-align: center;
  font-family: var(--font-acid-grotesk-book);
  font-size: ${pxToRem(20)};
  line-height: 1.2;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(15)};
  }
`;

type Props = {
  data: ProjectType["quote"];
};

const Quote = (props: Props) => {
  const { data } = props;

  return (
    <QuoteWrapper>
      <LayoutWrapper>
        <Inner $textColour={data?.textColour?.hex || "var(--colour-black)"}>
          {data?.quote && <QuoteText>{data.quote}</QuoteText>}
          <AuthorWrapper>
            <AuthorName>{data.author || ""}</AuthorName>
            <AuthorRole>{data.role || ""}</AuthorRole>
          </AuthorWrapper>
        </Inner>
      </LayoutWrapper>
    </QuoteWrapper>
  );
};

export default Quote;
