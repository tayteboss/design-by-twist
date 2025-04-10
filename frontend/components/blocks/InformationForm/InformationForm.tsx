import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";

const InformationFormWrapper = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    gap: ${pxToRem(12)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      gap: ${pxToRem(8)};
    }
  }

  .field {
    font-size: ${pxToRem(30)};
    line-height: 1.2;
    font-family: var(--font-holise-extra-light);
    font-weight: 200;
    padding: ${pxToRem(12)} ${pxToRem(20)};
    background: var(--colour-white);
    border: 1px solid var(--colour-black);
    border-radius: 30px;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(22)};
    }

    &__half {
      width: calc(50% - 6px);
    }

    &__full {
      width: 100%;
      margin-bottom: ${pxToRem(40)};
    }

    &::placeholder {
      opacity: 0.25;
    }
  }
`;

const Title = styled.h4`
  margin-bottom: ${pxToRem(16)};
  font-size: ${pxToRem(25)};
  line-height: ${pxToRem(35)};
  font-family: var(--font-acid-grotesk-regular);
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
  activeService: string | false;
  activeBudget: string | false;
  submitForm: boolean;
  setAllowExit: (allowExit: boolean) => void;
  handleExit: () => void;
};

const InformationForm = (props: Props) => {
  const { activeService, activeBudget, submitForm, handleExit, setAllowExit } =
    props;

  const [canSubmit, setCanSubmit] = useState(false);

  const validate = (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  };

  const handleValidation = (values: {
    name: string;
    email: string;
    information: string;
  }) => {
    const isValid = values.name && values.email && values.information;
    setCanSubmit(!!isValid);
  };

  useEffect(() => {
    if (canSubmit) {
      setAllowExit(false);
    } else {
      setAllowExit(true);
    }
  }, [canSubmit]);

  useEffect(() => {
    if (submitForm) {
      document.getElementById("submitButton")?.click();
    }
  }, [submitForm]);

  return (
    <InformationFormWrapper>
      <Title>Your Information</Title>
      <Formik
        initialValues={{
          name: "",
          email: "",
          information: "",
        }}
        validate={handleValidation}
        onSubmit={async (values) => {
          const allValues = {
            ...values,
            activeService,
            activeBudget,
          };

          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(allValues, null, 2));
        }}
      >
        <Form>
          <Field
            id="name"
            name="name"
            placeholder="Your name"
            required
            className="field field__half"
            validate={validate}
          />
          <Field
            id="email"
            name="email"
            placeholder="Your email"
            type="email"
            required
            className="field field__half"
            validate={validate}
          />
          <Field
            id="information"
            name="information"
            as="textarea"
            rows={4}
            required
            className="field field__full"
            placeholder="Tell us about your project"
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
              Submit
            </Button>
          </ButtonWrapper>
        </Form>
      </Formik>
    </InformationFormWrapper>
  );
};

export default InformationForm;
