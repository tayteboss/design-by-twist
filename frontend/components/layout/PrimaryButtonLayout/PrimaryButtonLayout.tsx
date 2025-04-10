import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const PrimaryButtonLayoutWrapper = styled.div<{
  $useLightTheme: boolean;
  $isActive?: boolean;
}>`
  min-width: ${pxToRem(300)};
  padding: 0 ${pxToRem(64)};
  height: ${pxToRem(48)};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-color: ${(props) =>
    props.$useLightTheme ? "var(--colour-white)" : "var(--colour-pink)"};
  color: ${(props) =>
    props.$useLightTheme ? "var(--colour-white)" : "var(--colour-black)"};
  border-radius: 100px;
  font-family: var(--font-holise-extra-light);
  font-size: ${pxToRem(30)};
  line-height: 1;
  white-space: nowrap;
  box-shadow: ${(props) =>
    props.$isActive ? "0 0 27px rgba(255, 107, 241, 0.75)" : "none"};
  background: ${(props) => props.$isActive && "var(--colour-white)"};

  transition: all 200ms var(--transition-ease);

  &:hover {
    box-shadow: 0 0 27px rgba(255, 107, 241, 0.75);
    transform: scale(1.01);
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(22)};
    padding: 0 ${pxToRem(24)};
  }
`;

type Props = {
  children: React.ReactNode;
  useLightTheme?: boolean;
  isActive?: boolean;
};

const PrimaryButtonLayout = (props: Props) => {
  const { children, useLightTheme = false, isActive } = props;

  return (
    <PrimaryButtonLayoutWrapper
      $isActive={isActive}
      $useLightTheme={useLightTheme}
      className="primary-button-layout"
    >
      {children}
    </PrimaryButtonLayoutWrapper>
  );
};

export default PrimaryButtonLayout;
