import styled from "styled-components";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";
import pxToRem from "../../../utils/pxToRem";

const RadioItemsWrapper = styled.div`
  margin-bottom: ${pxToRem(40)};

  .primary-button-layout {
    min-width: unset;
  }
`;

const Title = styled.h4`
  margin-bottom: ${pxToRem(16)};
  font-size: ${pxToRem(25)};
  line-height: ${pxToRem(35)};
  font-family: var(--font-acid-grotesk-book);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(22)};
    line-height: 1.2;
  }
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToRem(12)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    gap: ${pxToRem(8)};
  }
`;

const Button = styled.button``;

type ItemsType = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  items: ItemsType[];
  activeItem: false | string;
  setActiveItem: React.Dispatch<React.SetStateAction<false | string>>;
};

const RadioItems = (props: Props) => {
  const { title, items, activeItem, setActiveItem } = props;

  return (
    <RadioItemsWrapper>
      <Title>{title}</Title>
      <Items>
        {items.map((item, i) => (
          <Button
            key={`${item.value}-${i}`}
            onClick={() => setActiveItem(item.value)}
          >
            <PrimaryButtonLayout isActive={activeItem === item.value}>
              {item.label}
            </PrimaryButtonLayout>
          </Button>
        ))}
      </Items>
    </RadioItemsWrapper>
  );
};

export default RadioItems;
