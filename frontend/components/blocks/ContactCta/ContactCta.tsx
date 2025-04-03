import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { useEffect, useState } from "react";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";
import Link from "next/link";
import AnimateTextLayout from "../../layout/AnimateTextLayout";

const ContactCtaWrapper = styled.section`
  background: var(--colour-black);
`;

const Inner = styled.div`
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

  const [title, setTitle] = useState("");

  useEffect(() => {
    const title = data[Math.floor(Math.random() * data.length)];
    setTitle(title);
  }, [data]);

  return (
    <ContactCtaWrapper>
      <LayoutWrapper>
        <Inner>
          <Title>
            <AnimateTextLayout>{title || ""}</AnimateTextLayout>
          </Title>
          <ButtonWrapper>
            <Link href={`mailto${newBusinessEmail}`}>
              <PrimaryButtonLayout useLightTheme={true}>
                Let's work
              </PrimaryButtonLayout>
            </Link>
          </ButtonWrapper>
        </Inner>
      </LayoutWrapper>
    </ContactCtaWrapper>
  );
};

export default ContactCta;
