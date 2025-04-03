import Link from "next/link";
import styled from "styled-components";
import InstagramIcon from "../../svgs/InstagramIcon";
import pxToRem from "../../../utils/pxToRem";
import LinkedInIcon from "../../svgs/LinkedInIcon";
import BehanceIcon from "../../svgs/BehanceIcon";

const FooterSocialsWrapper = styled.div<{
  $desktopSize: boolean;
  $mobileSize: boolean;
}>`
  grid-column: span 2;
  display: ${(props) => (props.$mobileSize ? "none" : "block")};

  @media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
    display: ${(props) => (props.$desktopSize ? "none" : "block")};
    width: 100%;
  }
`;

const LinksWrapper = styled.div`
  align-items: center;
  gap: ${pxToRem(6)};
  display: flex;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    flex: 1;
    width: 100%;
  }
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

const BlankMobileCell = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    display: block;
    flex: 1;
    min-width: 50%;
  }
`;

type Props = {
  instagramUrl: string;
  linkedInUrl: string;
  behanceUrl: string;
  desktopSize?: boolean;
  mobileSize?: boolean;
};

const FooterSocials = (props: Props) => {
  const {
    instagramUrl,
    linkedInUrl,
    behanceUrl,
    desktopSize = false,
    mobileSize = false,
  } = props;

  return (
    <FooterSocialsWrapper
      className="footer-socials"
      $desktopSize={desktopSize}
      $mobileSize={mobileSize}
    >
      <LinksWrapper>
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
      </LinksWrapper>
    </FooterSocialsWrapper>
  );
};

export default FooterSocials;
