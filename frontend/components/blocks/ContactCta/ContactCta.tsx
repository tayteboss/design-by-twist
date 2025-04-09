import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { useEffect, useRef, useState } from "react";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";
import Link from "next/link";
import AnimateTextLayout from "../../layout/AnimateTextLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import router, { useRouter } from "next/router";
import useViewportWidth from "../../../hooks/useViewportWidth";

const ContactCtaWrapper = styled.section`
  background: var(--colour-black);
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Inner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(40)};
  padding: ${pxToRem(240)} ${pxToRem(10)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(180)} 0;
  }
`;

const Title = styled.h3`
  * {
    font-size: ${pxToRem(70)};
    line-height: ${pxToRem(75)};
    font-family: var(--font-holise-extra-light);
    font-weight: 200;
    color: var(--colour-white);
    max-width: ${pxToRem(1000)};
    margin: 0 auto;
    text-align: center;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(50)};
      line-height: ${pxToRem(50)};
    }
  }
`;

const ButtonWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: block;
  }
`;

type Props = {
  data: SiteSettingsType["footerContactCtas"];
  newBusinessEmail: SiteSettingsType["newBusinessEmail"];
};

const ContactCta = (props: Props) => {
  const { data, newBusinessEmail } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("");

  useEffect(() => {
    const title = data[Math.floor(Math.random() * data.length)];
    setTitle(title);
  }, [data]);

  const { scrollY } = useScroll();

  const [windowHeight, setWindowHeight] = useState(0);
  const [distanceToTop, setDistanceToTop] = useState(0);

  const router = useRouter();

  const opacity = useTransform(
    scrollY,
    [distanceToTop, distanceToTop + windowHeight / 2],
    ["1", "0"]
  );

  useEffect(() => {
    if (ref?.current) {
      setDistanceToTop(
        window.pageYOffset + ref.current.getBoundingClientRect().top
      );
    }

    setWindowHeight(window.innerHeight);

    const timer = setTimeout(() => {
      if (ref?.current) {
        setDistanceToTop(
          window.pageYOffset + ref.current.getBoundingClientRect().top
        );
      }

      setWindowHeight(window.innerHeight);
    }, 2000);

    return () => clearTimeout(timer);
  }, [distanceToTop, router.asPath]);

  return (
    <ContactCtaWrapper
      className="cursor-floating-button"
      data-cursor-title="Let's work"
      ref={ref}
    >
      <LayoutWrapper>
        <Link href={`mailto:${newBusinessEmail}`}>
          <Inner style={{ opacity }}>
            <Title>
              <AnimateTextLayout>{title || ""}</AnimateTextLayout>
            </Title>
            <ButtonWrapper>
              <PrimaryButtonLayout useLightTheme={true}>
                Let's work
              </PrimaryButtonLayout>
            </ButtonWrapper>
          </Inner>
        </Link>
      </LayoutWrapper>
    </ContactCtaWrapper>
  );
};

export default ContactCta;
