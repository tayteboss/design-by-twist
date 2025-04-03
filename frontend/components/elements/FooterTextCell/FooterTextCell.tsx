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

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
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

  a {
    text-decoration: none;

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
};

const FooterTextCell = (props: Props) => {
  const {
    title,
    linkTitle,
    linkUrl,
    text,
    useNewsletterButton = false,
  } = props;

  return (
    <FooterTextCellWrapper>
      <Title>{title}</Title>
      {linkTitle && linkUrl && (
        <Link href={linkUrl} target="_blank">
          {linkTitle}
        </Link>
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
