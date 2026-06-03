import Link from "next/link";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import PrimaryButtonLayout from "../../layout/PrimaryButtonLayout";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useState } from "react";

const FooterTextCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;

  a {
    text-decoration: underline;
    font-size: ${pxToRem(20)};
    line-height: 1.2;
    display: inline-block;

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }

  span {
    font-size: ${pxToRem(20)};
    line-height: 1.2;
    font-weight: 200;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(18)};
    }
  }
`;

const Title = styled.h5`
  font-size: ${pxToRem(20)};
  line-height: 1.2;
  text-transform: uppercase;
  font-weight: 200;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(13)};
  }
`;

const TextWrapper = styled.div``;

const Text = styled.p`
  font-size: ${pxToRem(20)};
  line-height: 1.2;
  font-weight: 200;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(18)};
  }
`;

const NewsletterFormWrapper = styled.div<{ $isComingSoon?: boolean }>`
  padding-top: ${pxToRem(16)};
  width: 100%;
  max-width: ${(props) => (props.$isComingSoon ? pxToRem(200) : pxToRem(400))};
  cursor: ${(props) => (props.$isComingSoon ? "not-allowed" : "auto")};

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    max-width: unset;
  }

  .field {
    font-size: ${pxToRem(15)} !important;
    line-height: 1 !important;
    padding: 12.5px 30px !important;
    font-family: var(--font-acid-grotesk-book) !important;
    font-weight: 200;
    border: 1px solid var(--colour-black);
    border-radius: 30px;
    width: 100%;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      font-size: ${pxToRem(22)} !important;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
      opacity: 1 !important;
    }
  }
`;

const NewsletterForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${pxToRem(10)};
`;

const SubmitButton = styled.button<{ $canSubmit: boolean }>`
  padding: 0 ${pxToRem(30)};
  height: ${pxToRem(48)};
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--colour-black);
  background: var(--colour-white);
  border: 1px solid var(--colour-black);
  border-radius: 100px;
  font-family: var(--font-holise-extra-light);
  font-size: ${pxToRem(30)};
  line-height: 1;
  white-space: nowrap;
  pointer-events: ${(props) => (props.$canSubmit ? "all" : "none")};
  opacity: ${(props) => (props.$canSubmit ? 1 : 0.25)};

  transition: all 200ms var(--transition-ease);

  &:hover {
    box-shadow: 0 0 27px rgba(255, 107, 241, 0.75);
    transform: scale(1.01);
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(22)};
  }
`;

const StatusMessage = styled.p<{ $variant: "success" | "error" }>`
  font-size: ${pxToRem(15)};
  line-height: 1.4;
  font-family: var(--font-acid-grotesk-book);
  color: ${(props) =>
    props.$variant === "error" ? "var(--colour-pink)" : "inherit"};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(18)};
  }
`;

type FormValues = {
  name: string;
  email: string;
};

type Props = {
  title: string;
  linkTitle?: string;
  linkUrl?: string;
  text?: string;
  useNewsletterButton?: boolean;
  prependText?: string;
};

const validateName = (value: string) => {
  if (!value) {
    return "Required";
  }
};

const validateEmail = (value: string) => {
  if (!value) {
    return "Required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Invalid email";
  }
};

const FooterTextCell = (props: Props) => {
  const {
    title,
    linkTitle,
    linkUrl,
    text,
    useNewsletterButton = false,
    prependText,
  } = props;

  const isComingSoon = true;

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FooterTextCellWrapper>
      <Title>{title}</Title>
      {linkTitle && linkUrl && (
        <>
          {prependText && (
            <span>
              {prependText}{" "}
              <Link href={linkUrl} target="_blank">
                {linkTitle}
              </Link>
            </span>
          )}
          {!prependText && (
            <Link href={linkUrl} target="_blank">
              {linkTitle}
            </Link>
          )}
        </>
      )}
      <TextWrapper>
        {text && <Text>{text}</Text>}
        {useNewsletterButton && (
          <NewsletterFormWrapper $isComingSoon={isComingSoon}>
            {isComingSoon ? (
              <PrimaryButtonLayout>Coming soon</PrimaryButtonLayout>
            ) : status === "success" ? (
              <StatusMessage $variant="success">
                You&apos;re on the list. Thanks for signing up!
              </StatusMessage>
            ) : (
              <Formik
                initialValues={{ name: "", email: "" }}
                onSubmit={handleSubmit}
              >
                {({ values, isSubmitting }) => {
                  const canSubmit =
                    !!values.name &&
                    !!values.email &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);

                  return (
                    <NewsletterForm>
                      <Field
                        id="newsletter-name"
                        name="name"
                        placeholder="Your name"
                        required
                        className="field"
                        validate={validateName}
                      />
                      <Field
                        id="newsletter-email"
                        name="email"
                        placeholder="Your email"
                        type="email"
                        required
                        className="field"
                        validate={validateEmail}
                      />
                      {status === "error" && (
                        <StatusMessage $variant="error">
                          {errorMessage}
                        </StatusMessage>
                      )}
                      <SubmitButton
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        $canSubmit={canSubmit && !isSubmitting}
                      >
                        {isSubmitting ? "Signing up..." : "Sign me up"}
                      </SubmitButton>
                    </NewsletterForm>
                  );
                }}
              </Formik>
            )}
          </NewsletterFormWrapper>
        )}
      </TextWrapper>
    </FooterTextCellWrapper>
  );
};

export default FooterTextCell;
