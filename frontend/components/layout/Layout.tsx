import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { ReactNode } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ProjectType, SiteSettingsType } from "../../shared/types/types";

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

  return (
    <>
      <Header projects={projects} />
      <ReactLenis root>
        <Main>{children}</Main>
      </ReactLenis>
      <Footer siteSettings={siteSettings} cursorRefresh={cursorRefresh} />
    </>
  );
};

export default Layout;
