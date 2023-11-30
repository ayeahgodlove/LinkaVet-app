import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { useModalContext } from "context/app-modal.context";
import { useQuiz } from "hooks/lms/quiz.hook";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { IQuiz } from "models/lms/quiz";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  formMode: UpdateMode;
};
export const QuizForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { quiz, editQuiz, addQuiz } = useQuiz();
  const { formError } = useFormErrors();
  const { setShow } = useModalContext();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  initFormData(form, formMode, quiz);

  const onClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setSubmitted(false);
      console.log(e);
    },
    []
  );

  const onFinish = async (values: IQuiz) => {
    setSubmitting(true);
    setSubmitted(false);
    const obj: IQuiz = {
      ...quiz,
      ...values,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addQuiz(obj);
      if (feedback) {
        message.success("Quiz created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editQuiz(obj);
      if (feedback) {
        message.success("Quiz updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setSubmitted(true);
        setShow(true);
      }
    }
    setSubmitting(false);
  };

  useEffect(() => {}, [hasSubmitted]);

  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="question"
          label="Question"
          requiredMark
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Question is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          disabled={submitting}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
