import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import ProjectCard from "../ProjectCard/ProjectCard";
import LayoutWrapper from "../../layout/LayoutWrapper";
import pxToRem from "../../../utils/pxToRem";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ProjectsWrapper = styled.section`
  padding: ${pxToRem(24)} 0 ${pxToRem(180)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(24)} 0 ${pxToRem(100)};
  }
`;

const Inner = styled(motion.div)`
  columns: 25vw;
  column-gap: ${pxToRem(32)};
  min-height: 100vh;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    columns: 40vw;
    column-gap: ${pxToRem(16)};
  }
`;

const Title = styled.h2`
  padding: ${pxToRem(64)} 0 ${pxToRem(80)};
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

type Props = {
  projects: ProjectType[];
  activeTag: string;
};

const Projects = (props: Props) => {
  const { projects, activeTag } = props;

  const [isHovered, setIsHovered] = useState(false);

  const hasProjects = projects?.length > 0;

  return (
    <ProjectsWrapper>
      <LayoutWrapper>
        <AnimatePresence mode="wait">
          {!hasProjects && <Title>No projects found</Title>}
          <Inner
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key={activeTag}
          >
            {hasProjects &&
              projects.map((project, i) => (
                <ProjectCard
                  slug={project.slug}
                  categoryMediaAndTagline={project.categoryMediaAndTagline}
                  defaultThumbnail={project.defaultThumbnail}
                  defaultThumbnailRatio={project.defaultThumbnailRatio}
                  defaultTagline={project.defaultTagline}
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                  activeTag={activeTag}
                  comingSoon={project.comingSoon}
                  key={project.slug.current}
                />
              ))}
          </Inner>
        </AnimatePresence>
      </LayoutWrapper>
    </ProjectsWrapper>
  );
};

export default Projects;
