import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProjectType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";

const MenuWrapper = styled.div`
  position: absolute;
  bottom: ${pxToRem(32)};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: all;
  transform-origin: center bottom;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    transform: translateX(-50%) scale(1.03);

    .cloud-inner {
      opacity: 1;
    }
  }

  .cloud-inner {
    opacity: 0.75;
  }
`;

const MenuInner = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const Main = styled(motion.div)`
  display: flex;
  gap: ${pxToRem(8)};
  background: rgba(206, 206, 206, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 100px;
  padding: ${pxToRem(16)};

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(206, 206, 206, 0.5);
  }
`;

const MainItem = styled(motion.div)`
  font-size: ${pxToRem(18)};
  line-height: 1;
  font-family: var(--font-acid-grotesk-regular);
  position: relative;
  padding: 0 ${pxToRem(16)};

  a {
    position: relative;
    z-index: 5;
  }

  * {
    font-size: ${pxToRem(18)};
    line-height: 1;
    font-family: var(--font-acid-grotesk-regular);
  }
`;

const Button = styled.button`
  position: relative;
  z-index: 5;
`;

const HoverCloud = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 125%;
  height: 50px;
  z-index: 2;
  pointer-events: none;
`;

const CloudInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  height: 100%;

  &::after {
    content: "";
    background: var(--colour-foreground);
    border-radius: 100px;
    filter: blur(10px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Back = styled(motion.button)`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(206, 206, 206, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 100px;
  font-size: 20px;
  line-height: 1;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const ProjectItem = styled(motion.button)`
  position: relative;
  background: rgba(206, 206, 206, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 100px;
  padding: ${pxToRem(16)} ${pxToRem(32)};

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(206, 206, 206, 0.5);
  }
`;

const ProjectItemTitle = styled.div`
  font-size: ${pxToRem(18)};
  line-height: 1;
  font-family: var(--font-acid-grotesk-regular);
  position: relative;
  z-index: 5;
`;

const ProjectList = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToRem(4)};
  z-index: 2;
`;

const ProjectItemLink = styled(motion.div)`
  position: relative;
  z-index: 5;
  background: rgba(206, 206, 206, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 100px;
  padding: 0 ${pxToRem(32)};
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: background var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  a {
    font-size: ${pxToRem(18)};
    line-height: 1;
    font-family: var(--font-acid-grotesk-regular);
  }
`;

const ProjectThumbnailWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: calc(100% + 4px);

  .media-wrapper {
    height: 15vw;
    width: 15vw;
  }
`;

const ProjectThumbnailInner = styled.div`
  overflow: hidden;
  border-radius: 10px;
`;

const BlankProjectItem = styled.div`
  position: relative;
  height: 50px;
  cursor: default;
  width: 100%;
`;

const itemEnterExitVariants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const projectListVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const projectChildVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const projectThumbnailVariants = {
  hidden: {
    opacity: 0,
    y: 5,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

type Props = {
  contactIsActive: boolean;
  projects: ProjectType[];
  setContactIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = (props: Props) => {
  const { contactIsActive, projects, setContactIsActive } = props;

  const [hoveredIndex, setHoveredIndex] = useState<null | string>(null);
  const [activePage, setActivePage] = useState<string | false>(false);
  const [activeProject, setActiveProject] = useState<false | string>("");
  const [isHoveringProjectItems, setIsHoveringProjectItems] = useState(false);
  const [activeProjectItem, setActiveProjectItem] = useState<false | string>(
    false
  );
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const router = useRouter();

  useEffect(() => {
    if (router.asPath === "/") {
      setActivePage(false);
    } else if (router.asPath === "/work") {
      setActivePage("work");
    } else if (router.asPath === "/studio") {
      setActivePage("studio");
    } else if (router.pathname === "/work/[...slug]") {
      setActivePage("project");
    }
  }, [router.asPath, router.pathname]);
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      if (router.pathname === "/work/[...slug]") {
        setActiveProject(
          document.body.getAttribute("data-project-title") || ""
        );
        const timer = setTimeout(() => {
          setActiveProject(
            document.body.getAttribute("data-project-title") || ""
          );
        }, 500);
        return () => clearTimeout(timer);
      } else {
        setActiveProject(false);
      }
    };

    handleRouteChangeComplete();

    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.pathname, router.events]);

  useEffect(() => {
    if (!isHoveringProjectItems) return;
    const handleScroll = () => {
      setIsHoveringProjectItems(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHoveringProjectItems]);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) => project.title !== activeProject)
    );
  }, [projects, router.asPath, activeProject]);

  return (
    <MenuWrapper>
      <MenuInner layout>
        <AnimatePresence mode="wait">
          {activePage === "project" && (
            <Back
              key="back-button"
              onClick={() => router.push("/work")}
              variants={itemEnterExitVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              ←
            </Back>
          )}
        </AnimatePresence>

        <Main onMouseLeave={() => setHoveredIndex(null)} layout>
          <MainItem onMouseEnter={() => setHoveredIndex("work")}>
            <Link href="/work">Work</Link>
            <AnimatePresence>
              {(hoveredIndex === "work" || activePage === "work") && (
                <HoverCloud
                  layoutId="underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.75 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CloudInner className="cloud-inner" />
                </HoverCloud>
              )}
            </AnimatePresence>
          </MainItem>

          <AnimatePresence mode="wait">
            {activePage !== "project" && (
              <>
                <MainItem
                  key="studio-button"
                  onMouseEnter={() => setHoveredIndex("studio")}
                  variants={itemEnterExitVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link href="/studio">Studio</Link>
                  <AnimatePresence>
                    {(hoveredIndex === "studio" || activePage === "studio") && (
                      <HoverCloud
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.75 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CloudInner className="cloud-inner" />
                      </HoverCloud>
                    )}
                  </AnimatePresence>
                </MainItem>

                <MainItem
                  key="contact-button"
                  onMouseEnter={() => setHoveredIndex("contact")}
                  variants={itemEnterExitVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Button onClick={() => setContactIsActive(true)}>
                    Contact
                  </Button>
                  <AnimatePresence>
                    {(hoveredIndex === "contact" || contactIsActive) && (
                      <HoverCloud
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.75 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CloudInner className="cloud-inner" />
                      </HoverCloud>
                    )}
                  </AnimatePresence>
                </MainItem>
              </>
            )}
          </AnimatePresence>
        </Main>

        <AnimatePresence mode="wait">
          {activePage === "project" && activeProject && (
            <ProjectItem
              key="project-item"
              variants={itemEnterExitVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseOver={() => setIsHoveringProjectItems(true)}
              layout
            >
              <ProjectItemTitle>{activeProject}</ProjectItemTitle>
              <HoverCloud
                layoutId="underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75, width: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CloudInner className="cloud-inner" />
              </HoverCloud>

              {/* Nested AnimatePresence for the project list popup */}
              <AnimatePresence>
                {isHoveringProjectItems && (
                  <ProjectList
                    variants={projectListVariants} // Your existing variants
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    key="project-list"
                    onMouseLeave={() => {
                      setIsHoveringProjectItems(false);
                      setActiveProjectItem(false);
                    }} // Use onMouseLeave on the container
                  >
                    {filteredProjects.map((item, i) => (
                      <ProjectItemLink
                        variants={projectChildVariants} // Your existing variants
                        key={`project-${item?.slug?.current || i}`} // Ensure key is unique and stable
                        onClick={() => setIsHoveringProjectItems(false)}
                        onMouseOver={() =>
                          setActiveProjectItem(item.slug.current)
                        }
                        // onMouseOut={() => setActiveProjectItem(false)} // Often better handled by parent's onMouseLeave
                      >
                        <Link href={`/work/${item.slug.current}`}>
                          {item.title}
                        </Link>
                        {/* Thumbnail Presence */}
                        <AnimatePresence mode="wait">
                          {activeProjectItem === item.slug.current && (
                            <ProjectThumbnailWrapper
                              variants={projectThumbnailVariants} // Your existing variants
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              key={`thumbnail-${item.slug.current}`} // Unique key
                            >
                              <ProjectThumbnailInner>
                                <MediaStack
                                  data={item.defaultThumbnail}
                                  sizes="15vw"
                                  noAnimation={true} // Assuming MediaStack has its own logic
                                />
                              </ProjectThumbnailInner>
                            </ProjectThumbnailWrapper>
                          )}
                        </AnimatePresence>
                      </ProjectItemLink>
                    ))}
                    {/* Consider removing BlankProjectItem if onMouseLeave on ProjectList works */}
                    <BlankProjectItem
                      onClick={() => setIsHoveringProjectItems(false)}
                    />
                  </ProjectList>
                )}
              </AnimatePresence>
            </ProjectItem>
          )}
        </AnimatePresence>
      </MenuInner>
    </MenuWrapper>
  );
};

export default Menu;
