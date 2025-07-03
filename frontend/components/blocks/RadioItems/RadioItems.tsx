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

// Multi-select props
type MultiSelectProps = {
  title: string;
  items: ItemsType[];
  activeItem: string[];
  setActiveItem: React.Dispatch<React.SetStateAction<string[]>>;
  allowMultiSelect: true;
};

// Single-select props
type SingleSelectProps = {
  title: string;
  items: ItemsType[];
  activeItem: string | false;
  setActiveItem: React.Dispatch<React.SetStateAction<string | false>>;
  allowMultiSelect?: false;
};

type Props = MultiSelectProps | SingleSelectProps;

const RadioItems = (props: Props) => {
  const { title, items, activeItem, allowMultiSelect, setActiveItem } = props;

  const isItemActive = (itemValue: string): boolean => {
    if (Array.isArray(activeItem)) {
      return activeItem.includes(itemValue);
    }
    return activeItem === itemValue;
  };

  const handleItemClick = (itemValue: string) => {
    if (allowMultiSelect) {
      const currentItems = activeItem as string[];
      if (currentItems.includes(itemValue)) {
        // Remove item if already selected
        (setActiveItem as React.Dispatch<React.SetStateAction<string[]>>)(
          currentItems.filter((item) => item !== itemValue)
        );
      } else {
        // Add item if not selected
        (setActiveItem as React.Dispatch<React.SetStateAction<string[]>>)([
          ...currentItems,
          itemValue,
        ]);
      }
    } else {
      const currentItem = activeItem as string | false;
      if (currentItem === itemValue) {
        // Deselect if already selected
        (setActiveItem as React.Dispatch<React.SetStateAction<string | false>>)(
          false
        );
      } else {
        // Select the item
        (setActiveItem as React.Dispatch<React.SetStateAction<string | false>>)(
          itemValue
        );
      }
    }
  };

  return (
    <RadioItemsWrapper>
      <Title>{title}</Title>
      <Items>
        {items.map((item, i) => (
          <Button
            key={`${item.value}-${i}`}
            onClick={() => handleItemClick(item.value)}
          >
            <PrimaryButtonLayout isActive={isItemActive(item.value)}>
              {item.label}
            </PrimaryButtonLayout>
          </Button>
        ))}
      </Items>
    </RadioItemsWrapper>
  );
};

export default RadioItems;
