import styled from "styled-components";
import FooterTextCell from "../../elements/FooterTextCell";
import pxToRem from "../../../utils/pxToRem";
import FooterSocials from "../FooterSocials";

const FooterEmailsWrapper = styled.div`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(24)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
    grid-column: span 3;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    grid-column: 1 / -1;

    .footer-socials {
      display: none;
    }
  }
`;

type Props = {
  contactEmail: string;
  instagramUrl: string;
  linkedInUrl: string;
  behanceUrl: string;
};

const FooterEmails = (props: Props) => {
  const { instagramUrl, linkedInUrl, behanceUrl, contactEmail } = props;

  return (
    <FooterEmailsWrapper>
      <FooterTextCell
        title="New Business"
        linkTitle={contactEmail}
        linkUrl={`mailto:${contactEmail}`}
        prependText="Want to start a new project? Say"
      />
      <FooterSocials
        instagramUrl={instagramUrl}
        linkedInUrl={linkedInUrl}
        behanceUrl={behanceUrl}
        mobileSize={true}
      />
    </FooterEmailsWrapper>
  );
};

export default FooterEmails;
