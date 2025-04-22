import styled from "styled-components";
import { NextSeo } from "next-seo";
import { StudioPageType, TransitionsType } from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import { studioPageQueryString } from "../lib/sanityQueries";
import StudioHero from "../components/blocks/StudioHero";
import AboutSection from "../components/blocks/AboutSection";
import ServicesSection from "../components/blocks/ServicesSection";
import PartnersSection from "../components/blocks/PartnersSection";

const PageWrapper = styled(motion.div)``;

type Props = {
  data: StudioPageType;
  cursorRefresh: () => void;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, pageTransitionVariants, cursorRefresh } = props;

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
      <StudioHero data={data?.heroSection} />
      <AboutSection data={data?.aboutSection} />
      <ServicesSection
        data={data?.servicesSection}
        cursorRefresh={cursorRefresh}
      />
      <PartnersSection data={data?.partnersSection} />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(studioPageQueryString);

  return {
    props: {
      data,
    },
  };
}

export default Page;
