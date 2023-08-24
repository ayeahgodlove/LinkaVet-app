import { Button, Form, Input, Alert, message, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { useModalContext } from "context/app-modal.context";
import { usePost } from "hooks/post.hook";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { IPost } from "models/post";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  formMode: UpdateMode;
};
export const PostForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { post, editPost, addPost } = usePost();
  const { formError } = useFormErrors();
  const { setShow } = useModalContext();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  initFormData(form, formMode, post);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const onFinish = async (values: IPost) => {
    setSubmitting(true);
    setSubmitted(false);
    const obj: IPost = {
      ...post,
      ...values,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addPost(obj);
      if (feedback) {
        message.success("Post created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editPost(obj);
      if (feedback) {
        message.success("Post updated successfully!");
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
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
        </Form.Item>

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
          name="imageUrl"
          label="Image Url"
          requiredMark
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Image Url is required",
            },
          ]}
        >
          <Input type="file" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          requiredMark
          rules={[
            {
              required: true,
              message: "Content is required",
            },
          ]}
        >
          <Input.TextArea />
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
