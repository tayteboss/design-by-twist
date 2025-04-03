import Link from "next/link";
import styled from "styled-components";
import InstagramIcon from "../../svgs/InstagramIcon";
import pxToRem from "../../../utils/pxToRem";
import LinkedInIcon from "../../svgs/LinkedInIcon";
import BehanceIcon from "../../svgs/BehanceIcon";

const FooterSocialsWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: ${pxToRem(6)};
`;

const IconWrapper = styled.div`
  width: ${pxToRem(35)};
  height: ${pxToRem(35)};
  background: var(--colour-foreground);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: var(--colour-black);
  }
`;

type Props = {
  instagramUrl: string;
  linkedInUrl: string;
  behanceUrl: string;
};

const FooterSocials = (props: Props) => {
  const { instagramUrl, linkedInUrl, behanceUrl } = props;

  return (
    <FooterSocialsWrapper>
      {instagramUrl && (
        <Link href={instagramUrl} target="_blank">
          <IconWrapper>
            <InstagramIcon />
          </IconWrapper>
        </Link>
      )}

      {linkedInUrl && (
        <Link href={linkedInUrl} target="_blank">
          <IconWrapper>
            <LinkedInIcon />
          </IconWrapper>
        </Link>
      )}

      {behanceUrl && (
        <Link href={behanceUrl} target="_blank">
          <IconWrapper>
            <BehanceIcon />
          </IconWrapper>
        </Link>
      )}
    </FooterSocialsWrapper>
  );
};

export default FooterSocials;
