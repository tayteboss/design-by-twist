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
import NewProjectModal from "../../blocks/NewProjectModal";
import { useLenis } from "@studio-freight/react-lenis";

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 200;
  background: var(--colour-white);
`;

const Outer = styled.div`
  background: var(--colour-white);
  position: relative;
  overflow: hidden;
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
  pointer-events: none;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  svg {
    width: 100%;
    height: auto;
  }
`;

const FooterBottomInner = styled(motion.div)`
  position: relative;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
`;

type Props = {
  cursorRefresh: () => void;
  siteSettings: SiteSettingsType;
};

const Footer = (props: Props) => {
  const {
    cursorRefresh,
    siteSettings: {
      instagramUrl,
      linkedInUrl,
      behanceUrl,
      contactEmail,
      officeAddress,
      officeGoogleMapsLink,
      newsletterCta,
      footerContactCtas,
      footerContactButtonTitle,
    },
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const [windowHeight, setWindowHeight] = useState(0);
  const [distanceToTop, setDistanceToTop] = useState(0);
  const [newProjectModalIsActive, setNewProjectModalIsActive] = useState(false);

  const router = useRouter();
  const lenis = useLenis(({ scroll }) => {});

  const viewport = useViewportWidth();
  const isMobile = viewport === "tabletPortrait" || viewport === "mobile";

  const blur = useTransform(
    scrollY,
    [distanceToTop - windowHeight, isMobile ? distanceToTop : distanceToTop],
    [isMobile ? "blur(0px)" : "blur(100px)", "blur(0px)"]
  );

  const opacity = useTransform(
    scrollY,
    [distanceToTop, isMobile ? distanceToTop : distanceToTop],
    ["0", "1"]
  );

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

  useEffect(() => {
    cursorRefresh();

    if (lenis) {
      lenis[newProjectModalIsActive ? "stop" : "start"]();
    }
  }, [newProjectModalIsActive, lenis]);

  return (
    <>
      <ContactCta
        data={footerContactCtas}
        buttonData={footerContactButtonTitle}
        setNewProjectModalIsActive={setNewProjectModalIsActive}
      />
      <FooterWrapper ref={ref}>
        <Outer>
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
                    contactEmail={contactEmail}
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
        </Outer>
      </FooterWrapper>
      <NewProjectModal
        isActive={newProjectModalIsActive}
        setNewProjectModalIsActive={setNewProjectModalIsActive}
        cursorRefresh={cursorRefresh}
      />
    </>
  );
};

export default Footer;
