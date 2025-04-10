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
import FilterBar from "../../components/blocks/FilterBar";
import Projects from "../../components/blocks/Projects";
import { useEffect, useState } from "react";

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
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (activeTag === "all") {
      setFilteredProjects(projects);
    } else {
      const filteredProjectsList = projects.filter((project) => {
        if (!project.categoryMediaAndTagline) return false;
        return project.categoryMediaAndTagline.some(
          (categoryMediaAndTagline) =>
            categoryMediaAndTagline.category === activeTag
        );
      });
      setFilteredProjects(filteredProjectsList);
    }
  }, [activeTag, projects]);

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
      <Projects projects={filteredProjects} activeTag={activeTag} />
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
