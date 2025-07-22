import styled from "styled-components";
import TwoColumnMedia from "../../blocks/TwoColumnMedia";
import FullMediaSection from "../../blocks/FullMediaSection";

type Props = {
  data: any;
  cursorRefresh: () => void;
};

const PageBuilderWrapper = styled.div`
  .pb-section:last-child {
    margin-bottom: 0;
  }
`;

const PageBuilder = (props: Props) => {
  const { data, cursorRefresh } = props;

  const sections: any = {
    fullMedia: FullMediaSection,
    twoColumnMedia: TwoColumnMedia,
  };

  return (
    <PageBuilderWrapper className="page-builder">
      {data &&
        data.map((section: any, i: number) => {
          {
            if (!sections[section.component]) {
              return (
                <div key={Math.random() * 10000}>
                  No section found for {section.component}
                </div>
              );
            } else {
              const Component = sections[section.component];
              return (
                <Component
                  key={`${section.component}-${i}`}
                  {...section}
                  cursorRefresh={cursorRefresh}
                />
              );
            }
          }
        })}
    </PageBuilderWrapper>
  );
};

export default PageBuilder;
