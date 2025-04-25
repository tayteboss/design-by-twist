import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const BackToTopWrapper = styled.button`
  position: fixed;
  bottom: ${pxToRem(24)};
  right: ${pxToRem(24)};
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
  z-index: 1;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const BackToTop = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <BackToTopWrapper onClick={() => handleBackToTop()}>↑</BackToTopWrapper>
  );
};

export default BackToTop;
