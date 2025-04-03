import styled from "styled-components";
import FooterTextCell from "../../elements/FooterTextCell";
import FooterSocials from "../FooterSocials";
import pxToRem from "../../../utils/pxToRem";

const FooterAddressWrapper = styled.div`
  grid-column: span 3;

  .footer-socials {
    display: none !important;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
    grid-column: span 4;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${pxToRem(24)};

    .footer-socials {
      display: flex !important;
    }
  }
`;

type Props = {
  officeAddress: string;
  officeGoogleMapsLink: string;
  instagramUrl: string;
  linkedInUrl: string;
  behanceUrl: string;
};

const FooterAddress = (props: Props) => {
  const {
    officeAddress,
    officeGoogleMapsLink,
    instagramUrl,
    linkedInUrl,
    behanceUrl,
  } = props;

  return (
    <FooterAddressWrapper>
      <FooterTextCell
        title="Address"
        linkTitle={officeAddress}
        linkUrl={officeGoogleMapsLink}
      />
      <FooterSocials
        instagramUrl={instagramUrl}
        linkedInUrl={linkedInUrl}
        behanceUrl={behanceUrl}
        mobileSize={true}
      />
    </FooterAddressWrapper>
  );
};

export default FooterAddress;
