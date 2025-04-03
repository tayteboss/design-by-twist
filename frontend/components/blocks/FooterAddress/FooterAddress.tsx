import styled from "styled-components";
import FooterTextCell from "../../elements/FooterTextCell";

const FooterAddressWrapper = styled.div`
  grid-column: span 3;
`;

type Props = {
  officeAddress: string;
  officeGoogleMapsLink: string;
};

const FooterAddress = (props: Props) => {
  const { officeAddress, officeGoogleMapsLink } = props;

  return (
    <FooterAddressWrapper>
      <FooterTextCell
        title="Address"
        linkTitle={officeAddress}
        linkUrl={officeGoogleMapsLink}
      />
    </FooterAddressWrapper>
  );
};

export default FooterAddress;
