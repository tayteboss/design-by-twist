import styled from "styled-components";
import client from "../../client";
import { motion } from "framer-motion";
import {
  ProjectType,
  TransitionsType,
  WorkPageType,
} from "../../shared/types/types";
import { NextSeo } from "next-seo";
import {
  projectsQueryString,
  workPageQueryString,
} from "../../lib/sanityQueries";
import pxToRem from "../../utils/pxToRem";
import PageBuilder from "../../components/common/PageBuilder";
import FilterBar from "../../components/blocks/FilterBar";
import Projects from "../../components/blocks/Projects";
import { useState } from "react";

const PageWrapper = styled(motion.div)`
  background: var(--colour-white);
`;

type Props = {
  data: WorkPageType;
  projects: ProjectType[];
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, projects, pageTransitionVariants } = props;

  const [activeTag, setActiveTag] = useState<string>("all");

  console.log("data", data);
  console.log("projects", projects);

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
      <FilterBar setActiveTag={setActiveTag} activeTag={activeTag} />
      <Projects projects={projects} />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(workPageQueryString);
  const projects = await client.fetch(projectsQueryString);

  return {
    props: {
      data,
      projects,
    },
  };
}

export default Page;
