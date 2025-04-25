import Link from "next/link";
import styled from "styled-components";
import LogoIcon from "../../svgs/LogoIcon";
import pxToRem from "../../../utils/pxToRem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Menu from "../../elements/Menu";
import { ProjectType, SiteSettingsType } from "../../../shared/types/types";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 100;
  pointer-events: none;
`;

const LogoWrapper = styled.div<{ $visible: boolean }>`
  pointer-events: all;
  position: absolute;
  top: ${pxToRem(24)};
  left: ${pxToRem(40)};
  z-index: 1;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    top: ${pxToRem(16)};
    left: ${pxToRem(16)};
  }

  svg {
    width: ${pxToRem(120)};
    height: auto;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      width: ${pxToRem(76)};
    }
  }
`;

type Props = {
  projects: ProjectType[];
  siteSettings: SiteSettingsType;
};

const Header = (props: Props) => {
  const { projects, siteSettings } = props;

  const [isVisible, setIsVisible] = useState(true);
  const [windowHeight, setWindowHeight] = useState(0);
  const [contactIsActive, setContactIsActive] = useState(false);

  const { pathname } = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [pathname]);

  const handleScroll = () => {
    if (pathname === "/") {
      // if (window.scrollY > document.body.scrollHeight - windowHeight * 2) {
      //   setIsVisible(false);
      // } else if (window.scrollY > 500) {
      //   setIsVisible(true);
      // } else {
      //   setIsVisible(false);
      // }
    } else {
      if (window.scrollY > document.body.scrollHeight - windowHeight * 2) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    updateWindowHeight();
    window.addEventListener("resize", updateWindowHeight);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateWindowHeight);
      if (pathname === "/") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pathname]);

  return (
    <HeaderWrapper className="header">
      <LogoWrapper $visible={isVisible}>
        <Link href="/">
          <LogoIcon />
        </Link>
      </LogoWrapper>
      <Menu
        contactIsActive={contactIsActive}
        setContactIsActive={setContactIsActive}
        projects={projects}
        siteSettings={siteSettings}
      />
    </HeaderWrapper>
  );
};

export default Header;
