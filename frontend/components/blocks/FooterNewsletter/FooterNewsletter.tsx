import styled from "styled-components";
import FooterTextCell from "../../elements/FooterTextCell";

const FooterNewsletterWrapper = styled.div`
  grid-column: span 4;

  @media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
    grid-column: span 5;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    grid-column: 1 / -1;
  }
`;

type Props = {
  newsletterCta: string;
};

const FooterNewsletter = (props: Props) => {
  const { newsletterCta } = props;

  return (
    <FooterNewsletterWrapper>
      <FooterTextCell
        title="Newsletter"
        text={newsletterCta}
        useNewsletterButton={true}
      />
    </FooterNewsletterWrapper>
  );
};

export default FooterNewsletter;
