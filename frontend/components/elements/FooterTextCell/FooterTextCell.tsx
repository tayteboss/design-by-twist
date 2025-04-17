import Link from "next/link";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";

const FooterTextCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;

  a {
    text-decoration: underline;
    font-size: ${pxToRem(20)};
    line-height: 1.2;
    display: inline-block

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }

  span {
    font-size: ${pxToRem(20)};
    line-height: 1.2;
    font-weight: 200;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(18)};
    }
  }
`;

const Title = styled.h5`
  font-size: ${pxToRem(20)};
  line-height: 1.2;
  text-transform: uppercase;
  font-weight: 200;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(13)};
  }
`;

const TextWrapper = styled.div``;

const Text = styled.p`
  font-size: ${pxToRem(20)};
  line-height: 1.2;
  font-weight: 200;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(18)};
  }
`;

const NewsletterButtonWrapper = styled.div`
  padding-top: ${pxToRem(16)};
  max-width: 200px;

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    max-width: unset;
  }

  a {
    text-decoration: none;

    @media ${(props) => props.theme.mediaBreakpoints.mobile} {
      width: 100%;
      display: block;
    }

    &:hover {
      opacity: 1;
    }
  }
`;

type Props = {
  title: string;
  linkTitle?: string;
  linkUrl?: string;
  text?: string;
  useNewsletterButton?: boolean;
  prependText?: string;
};

const FooterTextCell = (props: Props) => {
  const {
    title,
    linkTitle,
    linkUrl,
    text,
    useNewsletterButton = false,
    prependText,
  } = props;

  return (
    <FooterTextCellWrapper>
      <Title>{title}</Title>
      {linkTitle && linkUrl && (
        <>
          {prependText && (
            <span>
              {prependText}{" "}
              <Link href={linkUrl} target="_blank">
                {linkTitle}
              </Link>
            </span>
          )}
          {!prependText && (
            <Link href={linkUrl} target="_blank">
              {linkTitle}
            </Link>
          )}
        </>
      )}
      <TextWrapper>
        {text && <Text>{text}</Text>}
        {useNewsletterButton && (
          <NewsletterButtonWrapper>
            <Link href="/#" target="_blank">
              <PrimaryButtonLayout>Sign up</PrimaryButtonLayout>
            </Link>
          </NewsletterButtonWrapper>
        )}
      </TextWrapper>
    </FooterTextCellWrapper>
  );
};

export default FooterTextCell;
