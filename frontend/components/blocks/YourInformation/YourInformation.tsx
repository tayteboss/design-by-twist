import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { Field } from "formik";

const YourInformationWrapper = styled.div`
  width: 100%;

	.field {
		font-size: ${pxToRem(15)} !important;
    line-height: 1 !important;
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
  line-height: ${pxToRem(18)};
  font-family: var(--font-acid-grotesk-book);
`;

const InformationInner = styled.div`
	display: flex;
	gap: ${pxToRem(10)};
`;

const validate = (value: string) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const YourInformation = () => {
  return (
    <YourInformationWrapper>
      <Title>Your Information</Title>
			<InformationInner>
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
			</InformationInner>
    </YourInformationWrapper>
  );
};

export default YourInformation;
