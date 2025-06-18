import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import RadioItems from "../RadioItems";
import { useState } from "react";
import InformationForm from "../InformationForm";

const ProjectFormWrapper = styled.div`
  flex: 1;
  width: 50%;
  min-width: ${pxToRem(780)};
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  padding: ${pxToRem(40)} ${pxToRem(40)} ${pxToRem(80)};
  overflow-y: auto;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 100%;
    min-width: 100%;
    padding: ${pxToRem(40)} ${pxToRem(20)} ${pxToRem(80)};
  }
`;

const Title = styled.h2`
  font-size: ${pxToRem(70)};
  line-height: ${pxToRem(55)};
  font-family: var(--font-holise-extra-light);
  font-weight: 200;
  margin-bottom: ${pxToRem(64)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(50)};
    line-height: ${pxToRem(50)};
    margin-bottom: ${pxToRem(40)};
  }
`;

type Props = {
  setAllowExit: React.Dispatch<React.SetStateAction<boolean>>;
  submitForm: boolean;
  handleExit: () => void;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectForm = (props: Props) => {
  const { submitForm, handleExit, setAllowExit, setSuccess } = props;

  const [activeService, setActiveService] = useState<false | string>(false);
  const [activeBudget, setActiveBudget] = useState<false | string>(false);

  const serviceItems = [
    { label: "Brand Strategy", value: "brand-strategy" },
    { label: "Identity", value: "identity" },
    { label: "Website design", value: "website-design" },
    { label: "Tone of voice", value: "tone-of-voice" },
    { label: "Motion", value: "motion" },
    { label: "Other", value: "other" },
  ];

  const budgetItems = [
    { label: "Under €10k", value: "under-10k" },
    { label: "€10k-20k", value: "10k-20k" },
    { label: "€20k-50k", value: "20k-50k" },
    { label: "€50k-80k", value: "50k-80k" },
    { label: "€80k+", value: "80k-plus" },
  ];

  return (
    <ProjectFormWrapper data-lenis-prevent>
      <Title>Start a project</Title>
      <RadioItems
        title="What can we do for you?"
        items={serviceItems}
        setActiveItem={setActiveService}
        activeItem={activeService}
      />
      <RadioItems
        title="Do you have a budget range?"
        items={budgetItems}
        setActiveItem={setActiveBudget}
        activeItem={activeBudget}
      />
      <InformationForm
        activeService={activeService}
        activeBudget={activeBudget}
        submitForm={submitForm}
        setAllowExit={setAllowExit}
        handleExit={handleExit}
        setSuccess={setSuccess}
      />
    </ProjectFormWrapper>
  );
};

export default ProjectForm;
