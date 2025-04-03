import styled from "styled-components";
import FooterTextCell from "../../elements/FooterTextCell";
import pxToRem from "../../../utils/pxToRem";

const FooterEmailsWrapper = styled.div`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(24)};
`;

type Props = {
  newBusinessEmail: string;
  careersEmail: string;
};

const FooterEmails = (props: Props) => {
  const { newBusinessEmail, careersEmail } = props;

  return (
    <FooterEmailsWrapper>
      <FooterTextCell
        title="New Business"
        linkTitle={newBusinessEmail}
        linkUrl={`mailto:${newBusinessEmail}`}
      />
      <FooterTextCell
        title="Careers"
        linkTitle={careersEmail}
        linkUrl={`mailto:${careersEmail}`}
      />
    </FooterEmailsWrapper>
  );
};

export default FooterEmails;
