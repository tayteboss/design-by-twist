import styled from "styled-components";
import client from "../../client";
import { ProjectType, TransitionsType } from "../../shared/types/types";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { projectFields } from "../../lib/sanityQueries";
import ProjectHero from "../../components/blocks/ProjectHero";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PageBuilder from "../../components/common/PageBuilder";
import ProjectInformation from "../../components/blocks/ProjectInformation";
import BackToTop from "../../components/elements/BackToTop";
import RelatedProjects from "../../components/blocks/RelatedProjects";

type Props = {
  data: ProjectType;
  pageTransitionVariants: TransitionsType;
  cursorRefresh: () => void;
};

const PageWrapper = styled(motion.div)``;

const Page = (props: Props) => {
  const { data, cursorRefresh, pageTransitionVariants } = props;

  const router = useRouter();

  useEffect(() => {
    cursorRefresh();
    if (router.pathname === "/work/[...slug]") {
      document.body.setAttribute("data-project-title", data?.title);
      const timer = setTimeout(() => {
        document.body.setAttribute("data-project-title", data?.title);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      document.body.removeAttribute("data-project-title");
    }
  }, [data, router]);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={`${data?.title || ""} — Design by Twist`}
        description={data?.featuredTagline || ""}
      />
      <ProjectHero data={data?.heroMedia} />
      <ProjectInformation
        title={data?.informationTitle}
        description={data?.informationDescription}
      />
      <PageBuilder data={data?.pageBuilder} cursorRefresh={cursorRefresh} />
      {data?.relatedProjects && <RelatedProjects data={data.relatedProjects} />}
      <BackToTop />
    </PageWrapper>
  );
};

export async function getStaticPaths() {
  const projectsQuery = `
		*[_type == 'project'] [0...100] {
			slug
		}
	`;

  const allProjects = await client.fetch(projectsQuery);

  return {
    paths: allProjects.map((item: any) => {
      return `/work/${item?.slug?.current}`;
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const projectQuery = `
		*[_type == 'project' && slug.current == "${params.slug[0]}"][0] {
			${projectFields}
		}
	`;
  const data = await client.fetch(projectQuery);

  return {
    props: {
      data,
    },
  };
}

export default Page;
