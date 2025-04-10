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

type Props = {
  data: ProjectType;
  pageTransitionVariants: TransitionsType;
};

const PageWrapper = styled(motion.div)``;

const Page = (props: Props) => {
  const { data, pageTransitionVariants } = props;

  const router = useRouter();

  useEffect(() => {
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

  console.log("data", data);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={`${data?.title || ""} — Design by Twist`}
        description={data?.featuredDescription || ""}
      />
      <ProjectHero data={data?.heroMedia} />
      <ProjectInformation
        title={data?.informationTitle}
        description={data?.informationDescription}
      />
      <PageBuilder data={data?.pageBuilder} />
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
