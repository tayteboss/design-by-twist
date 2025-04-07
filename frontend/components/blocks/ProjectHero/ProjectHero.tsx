import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";

const ProjectHeroWrapper = styled.section`
  overflow: hidden;

  .media-wrapper {
    height: 100lvh;
  }
`;

const Inner = styled(motion.div)``;

type Props = {
  data: ProjectType["heroMedia"];
};

const ProjectHero = (props: Props) => {
  const { data } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const [windowHeight, setWindowHeight] = useState(0);

  const router = useRouter();

  const blur = useTransform(
    scrollY,
    [0, windowHeight * 2],
    ["blur(0px)", "blur(25px)"]
  );

  const transform = useTransform(
    scrollY,
    [0, windowHeight * 2],
    ["translateY(0px)", "translateY(50%)"]
  );

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const timer = setTimeout(() => {
      setWindowHeight(window.innerHeight);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router.asPath]);

  return (
    <ProjectHeroWrapper ref={ref}>
      <Inner style={{ transform, filter: blur }}>
        {data && <MediaStack data={data} />}
      </Inner>
    </ProjectHeroWrapper>
  );
};

export default ProjectHero;
