import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const PrimaryButtonLayoutWrapper = styled.div`
  min-width: ${pxToRem(300)};
  padding: 0 ${pxToRem(24)};
  height: ${pxToRem(48)};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--colour-black);
  border-radius: 100px;
  font-family: var(--font-holise-extra-light);
  font-size: ${pxToRem(30)};
  line-height: 1;

  transition: all var(--transition-speed-fast) var(--transition-ease);

  &:hover {
    background: var(--colour-foreground);
    color: var(--colour-black);
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(22)};
  }
`;

type Props = {
  children: React.ReactNode;
};

const PrimaryButtonLayout = (props: Props) => {
  const { children } = props;

  return <PrimaryButtonLayoutWrapper>{children}</PrimaryButtonLayoutWrapper>;
};

export default PrimaryButtonLayout;
