import {
  Button,
  Form,
  Input,
  Alert,
  message,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { modules } from "config/constant";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { useCategory } from "hooks/category.hook";
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
  const { user } = useAuth();
  const { categories } = useCategory();

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
      authorId: user.id,
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
        <Row gutter={[8, 8]}>
          <Col xs={24} md={12}>
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
            <Row gutter={[8, 8]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="duration"
                  label="Duration"
                  rules={[
                    {
                      required: true,
                      message: "duration is required",
                    },
                  ]}
                >
                  <InputNumber name="duration" style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="difficulty"
                  label="Difficulty"
                  rules={[
                    {
                      required: true,
                      message: "Difficulty is required",
                    },
                  ]}
                >
                  <Input name="difficulty" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
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
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

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

        <Row gutter={[8, 8]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="prerequisites"
              label="Prerequisites"
              requiredMark
              required={true}
              rules={[
                {
                  required: true,
                  message: "Prerequisites are required",
                },
              ]}
              style={{ marginBottom: 3 }}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Type to add prerequisites"
                options={[]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="objectives"
              label="Objectives"
              requiredMark
              required={true}
              rules={[
                {
                  required: true,
                  message: "Prerequisites are required",
                },
              ]}
              style={{ marginBottom: 3 }}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Type to add objectives"
                options={[]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col xs={24} md={6}>
            <Form.Item
              name="keywords"
              label="Keywords"
              style={{ marginBottom: 3 }}
              requiredMark
              required={true}
              rules={[
                {
                  required: true,
                  message: "Prerequisites are required",
                },
              ]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Type to add keywords"
                options={[]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              name="category"
              label="Category"
              style={{ marginBottom: 3 }}
            >
              <Select
                options={categories.map((c) => {
                  return {
                    value: c.id,
                    label: c.name,
                  };
                })}
                style={{ width: "100%" }}
                placeholder="Type to add category"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              name="language"
              label="Language"
              style={{ marginBottom: 3 }}
            >
              <Select
                options={[
                  { value: "01", label: "English" },
                  { value: "02", label: "French" },
                  { value: "03", label: "Spanish" },
                ]}
                style={{ width: "100%" }}
                placeholder="Type to add language"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="author" label="Author" style={{ marginBottom: 3 }}>
              <Input
                name="author"
                style={{ width: "100%" }}
                placeholder="Type to add author"
              />
            </Form.Item>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          disabled={submitting}
          style={{ marginTop: 10 }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
