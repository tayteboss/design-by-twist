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
  newBusinessEmail: string;
  careersEmail: string;
  instagramUrl: string;
  linkedInUrl: string;
  behanceUrl: string;
};

const FooterEmails = (props: Props) => {
  const {
    newBusinessEmail,
    careersEmail,
    instagramUrl,
    linkedInUrl,
    behanceUrl,
  } = props;

  return (
    <FooterEmailsWrapper>
      <FooterTextCell
        title="New Business"
        linkTitle={newBusinessEmail}
        linkUrl={`mailto:${newBusinessEmail}`}
      />
      <FooterTextCell
        title="Careers"
        linkTitle={careersEmail}
        linkUrl={`mailto:${careersEmail}`}
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
