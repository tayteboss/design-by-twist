import Link from "next/link";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const FeaturedFinalSlideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--colour-white);
  border: 1px solid var(--colour-black);
  padding: ${pxToRem(52)} ${pxToRem(40)};
  border-radius: 100px;
  max-width: ${pxToRem(275)};
  position: relative;
  font-size: ${pxToRem(37)};
  font-family: var(--font-holise-extra-light) !important;
  font-weight: 200;
  line-height: normal;
  text-align: center;

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(30)};
    padding: ${pxToRem(32)} ${pxToRem(50)};
    max-width: unset;
    white-space: nowrap;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(
      135deg,
      rgba(255, 105, 180, 0.5) 0%,
      rgba(255, 0, 110, 0.5) 100%
    );
    filter: blur(25px);
    border-radius: 100px;
    opacity: 1;
    z-index: -1;
    opacity: 0;

    transition: all var(--transition-speed-default) var(--transition-ease);
  }
`;

const FeaturedFinalSlide = () => {
  return (
    <Link href="/work">
      <FeaturedFinalSlideWrapper
        className="cursor-gallery__slide"
        data-cursor-title={"See work"}
      >
        View all work
      </FeaturedFinalSlideWrapper>
    </Link>
  );
};

export default FeaturedFinalSlide;
