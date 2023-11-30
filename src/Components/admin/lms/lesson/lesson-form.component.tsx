import { Button, Form, Input, Alert, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { modules } from "config/constant";
import { useModalContext } from "context/app-modal.context";
import { useLesson } from "hooks/lms/lesson.hook";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { ILesson } from "models/lms/lesson";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";

type Props = {
  formMode: UpdateMode;
};
export const LessonForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { lesson, editLesson, addLesson } = useLesson();
  const { formError } = useFormErrors();
  const { setShow } = useModalContext();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  initFormData(form, formMode, lesson);

  const onClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setSubmitted(false);
      console.log(e);
    },
    []
  );

  const onFinish = async (values: ILesson) => {
    setSubmitting(true);
    setSubmitted(false);
    const obj: ILesson = {
      ...lesson,
      ...values,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addLesson(obj);
      if (feedback) {
        message.success("Lesson created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editLesson(obj);
      if (feedback) {
        message.success("Lesson updated successfully!");
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
          name="title"
          label="Title"
          requiredMark
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Title is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          requiredMark
          rules={[
            {
              required: true,
              message: "Description is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"content"}
          label="Content"
          rules={[
            {
              required: true,
              message: "Content is required",
            },
          ]}
        >
          <ReactQuill
            modules={modules}
            theme="snow"
            onChange={(html) => form.setFieldValue("content", html)}
            placeholder="Enter content..."
          />
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
