import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimateTextLayoutWrapper = styled.div`
  display: inline-block;
`;

const Span = styled(motion.span)`
  white-space: pre;
`;

type Props = {
  children: React.ReactNode;
};

const wordVariants = {
  hidden: { opacity: 0, x: -3, filter: "blur(5px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.2,
      stiffness: 100,
      type: "spring",
      bounce: 0.5,
    },
  }),
};

const AnimateTextLayout = (props: Props) => {
  const { children } = props;
  const words = String(children).split(" ");

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <AnimateTextLayoutWrapper ref={ref}>
      {words.map((word, index) => (
        <Span
          key={index}
          variants={wordVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={index}
          style={{ display: "inline-block" }}
        >
          {word}{" "}
        </Span>
      ))}
    </AnimateTextLayoutWrapper>
  );
};

export default AnimateTextLayout;
