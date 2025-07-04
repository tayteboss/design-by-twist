import styled from "styled-components";
import ProjectForm from "../ProjectForm";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import pxToRem from "../../../utils/pxToRem";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";

const NewProjectModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 1000;
  display: flex;
`;

const ExitIntent = styled.div`
  flex: 1;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${pxToRem(64)};
`;

const SuccessBox = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${pxToRem(28)};
  padding: ${pxToRem(24)};
  background: var(--colour-white);
  border-radius: 5px;
  max-width: ${pxToRem(480)};
  min-width: ${pxToRem(480)};
  width: 50%;
  z-index: 1001;
`;

const SuccessIcon = styled.div`
  width: ${pxToRem(62)};
  height: ${pxToRem(62)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--colour-black);
`;

const SuccessText = styled.p`
  font-size: ${pxToRem(50)};
  line-height: ${pxToRem(55)};
  font-family: var(--font-holise-extra-light);
  font-weight: 200;
  text-align: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(35)};
  }
`;

const ExitIntentForm = styled.div<{ $isActive: boolean }>`
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  padding: ${pxToRem(24)};
  background: var(--colour-white);
  border-radius: 5px;
  max-width: ${pxToRem(500)};
  min-width: ${pxToRem(500)};
  width: 50%;

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const ExitTitle = styled.p`
  font-size: ${pxToRem(50)};
  line-height: ${pxToRem(55)};
  font-family: var(--font-holise-extra-light);
  font-weight: 200;
  margin-bottom: ${pxToRem(64)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(35)};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${pxToRem(16)};

  .primary-button-layout {
    min-width: unset;
    flex: 1;
  }
`;

const ButtonWrapper = styled.button``;

const SubmitButtonWrapper = styled.button`
  .primary-button-layout {
    background: var(--colour-black);
    color: var(--colour-white);
    border: 1px solid var(--colour-black);
  }
`;

const wrapperVariants = {
  initial: {
    opacity: 0,
    x: "-50%",
    transition: {
      duration: 0.75,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: "easeInOut",
    },
  },
  hidden: {
    opacity: 0,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  isActive: boolean;
  setNewProjectModalIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  cursorRefresh: () => void;
};

const NewProjectModal = (props: Props) => {
  const { isActive, cursorRefresh, setNewProjectModalIsActive } = props;

  const [exitIntent, setExitIntent] = useState(false);
  const [allowExit, setAllowExit] = useState(true);
  const [submitForm, setSubmitForm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleExit = () => {
    if (allowExit) {
      setNewProjectModalIsActive(false);
      setExitIntent(false);
      setAllowExit(true);
      setSubmitForm(false);
    } else {
      setExitIntent(true);
    }
  };

  useEffect(() => {
    if (success) {
      setNewProjectModalIsActive(false);
      setExitIntent(false);
      setAllowExit(true);
      setSubmitForm(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    cursorRefresh();
  }, [exitIntent, allowExit]);

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <NewProjectModalWrapper
            variants={wrapperVariants}
            initial="initial"
            animate="visible"
            exit="hidden"
            data-lenis-prevent
          >
            <ProjectForm
              setAllowExit={setAllowExit}
              handleExit={handleExit}
              submitForm={submitForm}
              setSuccess={setSuccess}
            />
            <ExitIntent
              className={!exitIntent ? "cursor-floating-button" : ""}
              data-cursor-title={!exitIntent ? "Close" : ""}
              onClick={() => handleExit()}
            >
              <ExitIntentForm $isActive={exitIntent}>
                <ExitTitle>You forgot to click submit. Are you sure?</ExitTitle>
                <ButtonsWrapper>
                  <ButtonWrapper
                    onClick={() => {
                      setExitIntent(false);
                      setNewProjectModalIsActive(false);
                    }}
                  >
                    <PrimaryButtonLayout>Close</PrimaryButtonLayout>
                  </ButtonWrapper>
                  <SubmitButtonWrapper
                    onClick={() => {
                      setExitIntent(false);
                      setSubmitForm(true);
                    }}
                  >
                    <PrimaryButtonLayout>Submit</PrimaryButtonLayout>
                  </SubmitButtonWrapper>
                </ButtonsWrapper>
              </ExitIntentForm>
            </ExitIntent>
          </NewProjectModalWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {success && (
          <SuccessBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SuccessIcon>
              <svg width="37" height="29" viewBox="0 0 37 29" fill="none">
                <path d="M1 13L13 28L36 1" stroke="black" />
              </svg>
            </SuccessIcon>
            <SuccessText>Thanks! We'll get back to you ASAP.</SuccessText>
          </SuccessBox>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewProjectModal;
