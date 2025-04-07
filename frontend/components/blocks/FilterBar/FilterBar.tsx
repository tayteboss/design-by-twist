import styled from "styled-components";
import LayoutWrapper from "../../layout/LayoutWrapper";
import pxToRem from "../../../utils/pxToRem";
import { motion } from "framer-motion";

const FilterBarWrapper = styled.section`
  padding: ${pxToRem(28)} 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(24)};
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
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--colour-black);
`;

type Props = {
  activeTag: string;
  setActiveTag: (tag: string) => void;
};

const FilterBar = (props: Props) => {
  const { activeTag, setActiveTag } = props;

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
    </FilterBarWrapper>
  );
};

export default FilterBar;
