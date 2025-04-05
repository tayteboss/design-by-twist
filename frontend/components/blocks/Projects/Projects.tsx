import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";

const ProjectsWrapper = styled.section``;

type Props = {
  projects: ProjectType[];
};

const Projects = (props: Props) => {
  const { projects } = props;

  return <ProjectsWrapper>Projects</ProjectsWrapper>;
};

export default Projects;
