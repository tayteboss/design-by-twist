import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { ReactNode } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ProjectType, SiteSettingsType } from "../../shared/types/types";
import CookieConsent from "react-cookie-consent";

const siteSettings: SiteSettingsType = require("../../json/siteSettings.json");
const projects: ProjectType[] = require("../../json/projectData.json");

const Main = styled.main``;

type Props = {
  children: ReactNode;
  cursorRefresh: () => void;
};

const Layout = (props: Props) => {
  const { children, cursorRefresh } = props;

  const lenis = useLenis(({ scroll }) => {});

  const cookieCta =
    "We use cookies to ensure you get the best experience on our website.";

  return (
    <>
      <Header projects={projects} siteSettings={siteSettings} />
      <ReactLenis root>
        <Main>{children}</Main>
      </ReactLenis>
      <Footer siteSettings={siteSettings} cursorRefresh={cursorRefresh} />
      {cookieCta && (
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          cookieName="dbt-cookie-consent"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            maxWidth: "450px",
            margin: "0 16px 16px",
            borderRadius: "4px",
            color: "#FFF",
            fontSize: "13px",
          }}
          buttonStyle={{
            color: "var(--colour-black)",
            background: "var(--colour-foreground)",
            borderRadius: "4px",
            fontSize: "13px",
          }}
          expires={150}
        >
          {cookieCta}
        </CookieConsent>
      )}
    </>
  );
};

export default Layout;
