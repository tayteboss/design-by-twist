import styled from "styled-components";
import LayoutWrapper from "../../layout/LayoutWrapper";
import pxToRem from "../../../utils/pxToRem";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

const FilterBarWrapper = styled.section`
  padding: ${pxToRem(28)} 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(80)} 0 0;
  }
`;

const Desktop = styled.div`
  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: block;
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(24)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    justify-content: flex-end;
  }
`;

const Tag = styled.button<{ $isActive: boolean }>`
  font-size: ${pxToRem(25)};
  line-height: ${pxToRem(35)};
  font-family: var(--font-holise-extra-light);
  font-weight: 200;
  text-transform: capitalize;
  position: relative;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(22)};
    line-height: 1;
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--colour-black);
`;

const Embla = styled.div``;

const EmblaContainer = styled.div`
  padding-left: ${pxToRem(20)};
  gap: ${pxToRem(16)};
`;

const EmblaSlide = styled.div`
  flex: 0 0 auto;
`;

type Props = {
  activeTag: string;
  setActiveTag: (tag: string) => void;
};

const FilterBar = (props: Props) => {
  const { activeTag, setActiveTag } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    skipSnaps: true,
  });

  const tags = [
    "all",
    "branding",
    "digital",
    "campaign",
    "packaging",
    "motion",
    "art-direction",
  ];

  return (
    <FilterBarWrapper>
      <Desktop>
        <LayoutWrapper>
          <Inner>
            {tags.map((tag) => (
              <Tag
                key={tag}
                $isActive={tag === activeTag}
                onClick={() => setActiveTag(tag)}
              >
                {tag.replace(/-/g, " ")}
                {tag === activeTag && (
                  <Underline
                    layoutId="filter-bar-underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </Tag>
            ))}
          </Inner>
        </LayoutWrapper>
      </Desktop>
      <Mobile>
        <Embla className="embla" ref={emblaRef}>
          <EmblaContainer className="embla__container">
            {tags.map((tag) => (
              <EmblaSlide className="embla__slide">
                <Tag
                  key={tag}
                  $isActive={tag === activeTag}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag.replace(/-/g, " ")}
                  {tag === activeTag && (
                    <Underline
                      layoutId="filter-bar-underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </Tag>
              </EmblaSlide>
            ))}
          </EmblaContainer>
        </Embla>
      </Mobile>
    </FilterBarWrapper>
  );
};

export default FilterBar;
