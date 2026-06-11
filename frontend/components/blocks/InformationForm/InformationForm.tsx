import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { Field, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";

const InformationFormWrapper = styled.div`
  width: 100%;

  .field {
    font-size: ${pxToRem(15)} !important;
    line-height: 1.4 !important;
    padding: 12.5px 30px !important;
    font-family: var(--font-acid-grotesk-book) !important;

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
      opacity: 1 !important;
    }
  }
`;

const Title = styled.h4`
  margin-bottom: ${pxToRem(12)};
  font-size: ${pxToRem(18)};
  line-height: ${pxToRem(25)};
  font-family: var(--font-acid-grotesk-book);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(22)};
    line-height: 1.2;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    gap: ${pxToRem(8)};
  }
`;

const CloseButton = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: block;
    flex: 1;
    width: 50%;

    .primary-button-layout {
      min-width: unset;
    }
  }
`;

const Button = styled.button<{ $canSubmit: boolean }>`
  min-width: ${pxToRem(215)};
  padding: 0 ${pxToRem(64)};
  height: ${pxToRem(48)};
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--colour-white);
  background: var(--colour-black);
  border-radius: 100px;
  font-family: var(--font-holise-extra-light);
  font-size: ${pxToRem(30)};
  line-height: 1;
  white-space: nowrap;
  pointer-events: ${(props) => (props.$canSubmit ? "all" : "none")};
  opacity: ${(props) => (props.$canSubmit ? 1 : 0.25)};

  transition: all 200ms var(--transition-ease);

  &:hover {
    box-shadow: 0 0 27px rgba(255, 107, 241, 0.75);
    transform: scale(1.01);
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(22)};
    min-width: unset;
    flex: 1;
    width: 50%;
  }
`;

type Props = {
  submitForm: boolean;
  setAllowExit: (allowExit: boolean) => void;
  handleExit: () => void;
};

const validate = (value: string) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const InformationForm = (props: Props) => {
  const { submitForm, handleExit, setAllowExit } = props;

  const { values } = useFormikContext<{
    name: string;
    email: string;
    information: string;
  }>();

  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const isValid = values.name && values.email && values.information;
    setCanSubmit(!!isValid);
  }, [values]);

  useEffect(() => {
    if (canSubmit) {
      setAllowExit(false);
    } else {
      setAllowExit(true);
    }
  }, [canSubmit, setAllowExit]);

  useEffect(() => {
    if (submitForm) {
      document.getElementById("submitButton")?.click();
    }
  }, [submitForm]);

  return (
    <InformationFormWrapper>
      <Title>What's the opportunity or challenge?</Title>
      <Field
        id="information"
        name="information"
        as="textarea"
        rows={4}
        required
        className="field field__full"
        placeholder="New launch, repositioning, growth, internal change, fundraising, product release… anything useful for context."
        validate={validate}
      />
      <ButtonWrapper>
        <CloseButton
          onClick={() => {
            setAllowExit(true);
            handleExit();
          }}
        >
          <PrimaryButtonLayout>Close</PrimaryButtonLayout>
        </CloseButton>
        <Button
          id="submitButton"
          type="submit"
          disabled={!canSubmit}
          $canSubmit={canSubmit}
        >
          Start a conversation
        </Button>
      </ButtonWrapper>
    </InformationFormWrapper>
  );
};

export default InformationForm;
