import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import RadioItems from "../RadioItems";
import { useState } from "react";
import InformationForm from "../InformationForm";
import YourInformation from "../YourInformation";
import { Formik, Form } from "formik";

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

const StyledForm = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToRem(36)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    gap: ${pxToRem(8)};
  }

  .field {
    font-size: ${pxToRem(15)};
    line-height: 1;
    font-family: var(--font-holise-extra-light);
    font-weight: 200;
    padding: ${pxToRem(12)} ${pxToRem(20)};
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

const Title = styled.h2`
  font-size: ${pxToRem(70)};
  line-height: ${pxToRem(65)};
  font-family: var(--font-holise-extra-light);
  font-weight: 200;
  margin-bottom: ${pxToRem(20)};
  max-width: ${pxToRem(570)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(50)};
    line-height: ${pxToRem(50)};
  }
`;

const SubTitle = styled.h4`
  font-size: ${pxToRem(20)};
  line-height: ${pxToRem(25)};
  font-family: var(--font-acid-grotesk-book);
  font-weight: 400;
  margin-bottom: ${pxToRem(36)};
  max-width: ${pxToRem(420)};
`;

type Props = {
  setAllowExit: React.Dispatch<React.SetStateAction<boolean>>;
  submitForm: boolean;
  handleExit: () => void;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectForm = (props: Props) => {
  const { submitForm, handleExit, setAllowExit, setSuccess } = props;

  const [activeService, setActiveService] = useState<string[]>([]);
  const [activeBudget, setActiveBudget] = useState<false | string>(false);
  const [activeLaunchStage, setActiveLaunchStage] = useState<false | string>(
    false
  );
  const [activeTimeline, setActiveTimeline] = useState<false | string>(false);

  const serviceItems = [
    { label: "Visual Identity", value: "visual-identity" },
    { label: "Brand Strategy", value: "brand-strategy" },
    { label: "Website & Digital", value: "website-digital" },
    { label: "Campaigns", value: "campaigns" },
    { label: "Creative Partnership", value: "creative-partnership" },
    { label: "Not sure yet", value: "not-sure-yet" },
  ];

  const budgetItems = [
    { label: "Under €20k", value: "under-20k" },
    { label: "€20k - €40k", value: "20k-40k" },
    { label: "€40k- €80k", value: "40k-80k" },
    { label: "€80k +", value: "80k-plus" },
  ];

  const launchStageItems = [
    { label: "Launching", value: "launching" },
    { label: "Growing", value: "growing" },
    { label: "Repositioning", value: "repositioning" },
    { label: "Refreshing", value: "refreshing" },
    { label: "Exploring", value: "exploring" },
    { label: "Other", value: "other" },
  ];

  const timelineItems = [
    { label: "ASAP", value: "asap" },
    { label: "1–2 months", value: "1-2-months" },
    { label: "3–6 months", value: "3-6-months" },
    { label: "Just exploring", value: "just-exploring" },
  ];

  return (
    <ProjectFormWrapper data-lenis-prevent>
      <Title>Let’s make something out of the ordinary</Title>
      <SubTitle>A few quick questions to help us understand what you’re building.</SubTitle>
      <Formik
        initialValues={{
          name: "",
          email: "",
          information: "",
        }}
        onSubmit={async (values) => {
          const allValues = {
            ...values,
            activeService,
            activeBudget,
            activeLaunchStage,
            activeTimeline,
          };

          try {
            const response = await fetch("/api/send-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(allValues),
            });

            if (response.ok) {
              setSuccess(true);
            } else {
              alert("Failed to send email. Try again later.");
            }
          } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form.");
          }
        }}
      >
        <StyledForm>
          <YourInformation />
          <RadioItems
            title="What do you need help with?"
            items={serviceItems}
            setActiveItem={setActiveService}
            activeItem={activeService}
            allowMultiSelect={true}
          />
          <RadioItems
            title="Do you have a budget range?"
            items={budgetItems}
            setActiveItem={setActiveBudget}
            activeItem={activeBudget}
          />
          <RadioItems
            title="What stage are you at?"
            items={launchStageItems}
            setActiveItem={setActiveLaunchStage}
            activeItem={activeLaunchStage}
          />
          <RadioItems
            title="Timeline"
            items={timelineItems}
            setActiveItem={setActiveTimeline}
            activeItem={activeTimeline}
          />
          <InformationForm
            submitForm={submitForm}
            setAllowExit={setAllowExit}
            handleExit={handleExit}
          />
        </StyledForm>
      </Formik>
    </ProjectFormWrapper>
  );
};

export default ProjectForm;
