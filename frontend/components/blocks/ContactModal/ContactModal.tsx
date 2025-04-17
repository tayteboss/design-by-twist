import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import Cross from "../../svgs/Cross";
import pxToRem from "../../../utils/pxToRem";

const ContactModalWrapper = styled(motion.div)`
  position: absolute;
  bottom: calc(100% + 8px);
  background: rgba(206, 206, 206, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 26px;
  padding: ${pxToRem(16)};
  width: 100%;
  padding: ${pxToRem(24)} ${pxToRem(8)};
  display: flex;
  justify-content: center;
  align-items: center;

  span,
  a {
    font-size: ${pxToRem(18)};
    line-height: 1.3;
    font-weight: 200;
    text-align: center;
  }

  a {
    text-decoration: underline;

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

const Inner = styled.div`
  max-width: ${pxToRem(260)};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseTrigger = styled.button`
  height: ${pxToRem(36)};
  width: ${pxToRem(36)};
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(206, 206, 206, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 50%;
  position: absolute;
  top: -28px;
  right: -28px;

  transition: background var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    top: -42px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:hover {
    background: rgba(206, 206, 206, 0.75);
  }
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  isActive: boolean;
  setContactIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  contactEmail?: string;
};

const ContactModal = (props: Props) => {
  const { isActive, setContactIsActive, contactEmail } = props;
  return (
    <AnimatePresence>
      {isActive && (
        <ContactModalWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Inner>
            <span>
              {"Want to start a new project? Say"}{" "}
              <Link href={`mailto: ${contactEmail || ""}`} target="_blank">
                {contactEmail || ""}
              </Link>
            </span>
          </Inner>
          <CloseTrigger onClick={() => setContactIsActive(false)}>
            <Cross />
          </CloseTrigger>
        </ContactModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
