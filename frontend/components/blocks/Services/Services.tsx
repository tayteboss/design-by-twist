import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import { useEffect, useState } from "react";
import ServiceCell from "../ServiceCell";
import pxToRem from "../../../utils/pxToRem";
import Link from "next/link";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";
import LayoutWrapper from "../../layout/LayoutWrapper";

const ServicesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(40)};
  padding: ${pxToRem(80)} 0 ${pxToRem(40)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    gap: ${pxToRem(20)};
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    gap: 0;
  }

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    padding: ${pxToRem(40)} 0 0;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: 5vw;
  padding-top: ${pxToRem(32)};
  max-width: ${pxToRem(370)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-left: 0;
  }
`;

type Props = {
  data: StudioPageType["servicesSection"]["services"];
  cursorRefresh: () => void;
};

const Services = (props: Props) => {
  const { data, cursorRefresh } = props;

  const [indexActive, setIndexActive] = useState(0);

  const hasData = data?.length > 0;

  useEffect(() => {
    cursorRefresh();
  }, [indexActive]);

  return (
    <ServicesWrapper>
      {hasData &&
        data.map((service, i) => (
          <ServiceCell
            title={service?.title}
            description={service?.description}
            images={service?.images}
            isActive={indexActive === i}
            setIndexActive={setIndexActive}
            index={i}
            key={`service-${i}`}
          />
        ))}
      <LayoutWrapper>
        <ButtonWrapper>
          <Link href="/work">
            <PrimaryButtonLayout>See the work</PrimaryButtonLayout>
          </Link>
        </ButtonWrapper>
      </LayoutWrapper>
    </ServicesWrapper>
  );
};

export default Services;
