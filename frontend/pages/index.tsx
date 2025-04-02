import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  HomePageType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  homePageQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import FeaturedProjects from "../components/blocks/FeaturedProjects";
import HomeStudio from "../components/blocks/HomeStudio";
import HomeHero from "../components/blocks/HomeHero";

const PageWrapper = styled(motion.div)`
  overflow: hidden;
`;

type Props = {
  data: HomePageType;
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, siteSettings, pageTransitionVariants } = props;

  console.log("data", data);
  console.log("siteSettings", siteSettings);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={data?.seoTitle || ""}
        description={data?.seoDescription || ""}
      />
      <HomeHero data={data?.heroSection} />
      <HomeStudio data={data?.studioSection} />
      <FeaturedProjects data={data?.featuredProjectsSection} />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const data = await client.fetch(homePageQueryString);

  return {
    props: {
      data,
      siteSettings,
    },
  };
}

export default Page;
