import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import ContactCta from "../../blocks/ContactCta";
import LayoutGrid from "../../layout/LayoutGrid";
import LayoutWrapper from "../../layout/LayoutWrapper";
import FooterAddress from "../../blocks/FooterAddress";
import FooterEmails from "../../blocks/FooterEmails";
import FooterNewsletter from "../../blocks/FooterNewsletter";
import FooterSocials from "../../blocks/FooterSocials";
import pxToRem from "../../../utils/pxToRem";
import LogoIcon from "../../svgs/LogoIcon";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import useViewportWidth from "../../../hooks/useViewportWidth";
import { useRouter } from "next/router";

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 5;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const FooterTop = styled.div`
  padding: ${pxToRem(40)} 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    .footer-socials {
      display: none;
    }

    .layout-grid {
      gap: ${pxToRem(36)};
    }
  }
`;

const FooterBottom = styled(motion.div)`
  position: sticky;
  bottom: 0px;

  svg {
    width: 100%;
    height: auto;
  }
`;

const FooterBottomInner = styled(motion.div)`
  position: relative;
`;

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
    },
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const [windowHeight, setWindowHeight] = useState(0);
  const [distanceToTop, setDistanceToTop] = useState(0);

  const router = useRouter();

  const viewport = useViewportWidth();
  const isMobile = viewport === "tablet-portrait" || viewport === "mobile";

  const blur = useTransform(
    scrollY,
    [
      distanceToTop - windowHeight,
      isMobile
        ? distanceToTop + (windowHeight - 200)
        : distanceToTop + windowHeight / 2,
    ],
    ["blur(100px)", "blur(0px)"]
  );

  const opacity = useTransform(
    scrollY,
    [
      distanceToTop,
      isMobile
        ? distanceToTop + (windowHeight - 200)
        : distanceToTop + windowHeight / 2,
    ],
    ["0", "1"]
  );

  // const transform = useTransform(
  //   scrollY,
  //   [distanceToTop, distanceToTop + windowHeight],
  //   ["translateY(300px)", "translateY(0px)"]
  // );

  useEffect(() => {
    if (ref?.current) {
      setDistanceToTop(
        window.pageYOffset + ref.current.getBoundingClientRect().top
      );
    }

    setWindowHeight(window.innerHeight);

    const timer = setTimeout(() => {
      if (ref?.current) {
        setDistanceToTop(
          window.pageYOffset + ref.current.getBoundingClientRect().top
        );
      }

      setWindowHeight(window.innerHeight);
    }, 2000);

    return () => clearTimeout(timer);
  }, [distanceToTop, router.asPath]);

  return (
    <FooterWrapper ref={ref}>
      <ContactCta
        data={footerContactCtas}
        newBusinessEmail={newBusinessEmail}
      />
      <LayoutWrapper>
        <Inner>
          <FooterTop>
            <LayoutGrid>
              <FooterSocials
                instagramUrl={instagramUrl}
                linkedInUrl={linkedInUrl}
                behanceUrl={behanceUrl}
                desktopSize={true}
              />
              <FooterEmails
                newBusinessEmail={newBusinessEmail}
                careersEmail={careersEmail}
                instagramUrl={instagramUrl}
                linkedInUrl={linkedInUrl}
                behanceUrl={behanceUrl}
              />
              <FooterNewsletter newsletterCta={newsletterCta} />
              <FooterAddress
                officeAddress={officeAddress}
                officeGoogleMapsLink={officeGoogleMapsLink}
                instagramUrl={instagramUrl}
                linkedInUrl={linkedInUrl}
                behanceUrl={behanceUrl}
              />
            </LayoutGrid>
          </FooterTop>
          <FooterBottom style={{ filter: blur, opacity }}>
            <FooterBottomInner>
              <LogoIcon />
            </FooterBottomInner>
          </FooterBottom>
        </Inner>
      </LayoutWrapper>
    </FooterWrapper>
  );
};

export default Footer;
