import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ProjectType, SiteSettingsType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";
import throttle from "lodash.throttle";
import useViewportWidth from "../../../hooks/useViewportWidth";
import ContactModal from "../../blocks/ContactModal";
import { useClickOutside } from "../../../hooks/useClickOutside";

const MenuWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  bottom: ${pxToRem(32)};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: all;
  transform-origin: center bottom;
  opacity: ${(props) => (props.$isActive ? "1" : "0")};

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    .cloud-inner {
      opacity: 1;
    }
  }

  .cloud-inner {
    opacity: 0.75;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    bottom: ${pxToRem(24)};
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
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(206, 206, 206, 0.5);
  }
`;

const MainItem = styled(motion.div)`
  font-size: ${pxToRem(18)};
  line-height: 1;
  font-family: var(--font-acid-grotesk-book);
  position: relative;
  padding: 0 ${pxToRem(16)};

  a {
    position: relative;
    z-index: 5;
  }

  * {
    font-size: ${pxToRem(18)};
    line-height: 1;
    font-family: var(--font-acid-grotesk-book);
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
  width: 100%;
  height: 100%;
  background: var(--colour-foreground);
  border-radius: 100px;
  filter: blur(10px);
  -webkit-filter: blur(10px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-100%, -100%) translateZ(0);
  -webkit-transform: translate(-100%, -100%) translateZ(0);
  width: 100%;
  height: 100%;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

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
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

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

const ProjectItemTitleWrapper = styled.div`
  position: relative;
  z-index: 5;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: flex;
    align-items: center;
    gap: ${pxToRem(16)};
  }
`;

const ProjectItemTitle = styled.div`
  font-size: ${pxToRem(18)};
  line-height: 1.1;
  font-family: var(--font-acid-grotesk-book);
  /* max-width: ${pxToRem(100)}; */
  white-space: nowrap;
  overflow: hidden;
`;

const MobileHamburgerWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14px;
    height: 10px;
    position: relative;
    z-index: 5;
    top: 1px;

    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
  }
`;

const MobileCrossWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;

    svg {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 20px;
      width: 20px;
    }
  }
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
  background: rgba(206, 206, 206, 0.7);
  border-radius: 100px;
  padding: ${pxToRem(8)} ${pxToRem(16)};
  display: flex;
  justify-content: center;
  align-items: center;

  transition: background var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(7)} ${pxToRem(12)};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  a {
    font-size: ${pxToRem(18)};
    white-space: nowrap;
    line-height: 1;
    font-family: var(--font-acid-grotesk-book);

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(15)};
    }
  }
`;

const ProjectThumbnailWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: calc(100% + 4px);

  .media-wrapper {
    height: 12vw;
    width: 12vw;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
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
  siteSettings: SiteSettingsType;
  setContactIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = (props: Props) => {
  const { contactIsActive, projects, siteSettings, setContactIsActive } = props;

  const [isActive, setIsActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<null | string>(null);
  const [activePage, setActivePage] = useState<string | false>(false);
  const [activeProject, setActiveProject] = useState<false | string>("");
  const [isHoveringProjectItems, setIsHoveringProjectItems] = useState(false);
  const [activeProjectItem, setActiveProjectItem] = useState<false | string>(
    false
  );
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const router = useRouter();
  const viewport = useViewportWidth();

  const formatSmallTitle = (title: string) => {
    if (viewport === "mobile" && title.length > 8) {
      return `${title.slice(0, 8)}...`;
    }

    return title;
  };

  useEffect(() => {
    if (router.asPath !== "/") {
      setIsActive(false);
    } else {
      const handleScroll = throttle(() => {
        if (window.scrollY < 100) {
          setIsActive(false);
        } else {
          setIsActive(true);
        }
      }, 100);

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [router.asPath]);

  useEffect(() => {
    if (router.asPath === "/") {
      setActivePage(false);
      setIsActive(false);
    } else if (router.asPath === "/work") {
      setIsActive(true);
      setActivePage("work");
    } else if (router.asPath === "/studio") {
      setIsActive(true);
      setActivePage("studio");
    } else if (router.pathname === "/work/[...slug]") {
      setIsActive(true);
      setActivePage("project");
    } else {
      setIsActive(true);
    }
  }, [router.asPath, router.pathname]);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setContactIsActive(false);

      if (router.pathname === "/work/[...slug]") {
        setActiveProject(
          document.body.getAttribute("data-project-title") || ""
        );
        const timer = setTimeout(() => {
          setActiveProject(
            document.body.getAttribute("data-project-title") || ""
          );
        }, 500);
        const timer2 = setTimeout(() => {
          setActiveProject(
            document.body.getAttribute("data-project-title") || ""
          );
        }, 1000);
        return () => {
          clearTimeout(timer);
          clearTimeout(timer2);
        };
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

  const outsideClickRef = useRef<HTMLDivElement>(null!);
  useClickOutside(outsideClickRef, () => {
    setIsHoveringProjectItems(false);
    setActiveProjectItem(false);
  });

  return (
    <MenuWrapper $isActive={isActive}>
      <ContactModal
        isActive={contactIsActive}
        setContactIsActive={setContactIsActive}
        contactEmail={siteSettings?.contactEmail}
      />

      <MenuInner layout>
        {/* BACK BUTTON */}
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

        {/* MAIN */}
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
                  {hoveredIndex === "contact" && (
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
        </Main>

        {/* PROJECT DESKTOP ITEMS */}
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
              <ProjectItemTitleWrapper>
                <ProjectItemTitle>
                  {formatSmallTitle(activeProject)}
                </ProjectItemTitle>
                {!isHoveringProjectItems ? (
                  <MobileHamburgerWrapper>
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="14" height="0.666667" fill="black" />
                      <rect
                        y="4.66699"
                        width="14"
                        height="0.666667"
                        fill="black"
                      />
                      <rect
                        y="9.33301"
                        width="14"
                        height="0.666667"
                        fill="black"
                      />
                    </svg>
                  </MobileHamburgerWrapper>
                ) : (
                  <MobileCrossWrapper>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </MobileCrossWrapper>
                )}
              </ProjectItemTitleWrapper>
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
                    }}
                    ref={outsideClickRef}
                  >
                    {filteredProjects.map((item, i) => (
                      <ProjectItemLink
                        variants={projectChildVariants}
                        key={`project-${item?.slug?.current || i}`}
                        onClick={() => setIsHoveringProjectItems(false)}
                        onMouseOver={() =>
                          setActiveProjectItem(item.slug.current)
                        }
                      >
                        {item.comingSoon ? (
                          <Link href={`/work/${item.slug.current}`}>
                            {item.title}
                          </Link>
                        ) : (
                          <Link href={`/work/${item.slug.current}`}>
                            {item.title}
                          </Link>
                        )}
                        {/* Thumbnail Presence */}
                        <AnimatePresence mode="wait">
                          {activeProjectItem === item.slug.current && (
                            <ProjectThumbnailWrapper
                              variants={projectThumbnailVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              key={`thumbnail-${item.slug.current}`}
                            >
                              <ProjectThumbnailInner>
                                <MediaStack
                                  data={item.mobileMenuThumbnail}
                                  sizes="12vw"
                                  noAnimation={true}
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
