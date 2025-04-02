import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import ContactCta from "../../blocks/ContactCta";

const FooterWrapper = styled.footer``;

type Props = {
  siteSettings: SiteSettingsType;
};

const Footer = (props: Props) => {
  const {
    siteSettings: {
      instagramUrl,
      linkedInUrl,
      behanceUrl,
      newBusinessEmail,
      careersEmail,
      officeAddress,
      officeGoogleMapsLink,
      newsletterCta,
      footerContactCtas,
      newProjectExitPrompt,
    },
  } = props;

  return (
    <FooterWrapper>
      <ContactCta data={footerContactCtas} />
    </FooterWrapper>
  );
};

export default Footer;
