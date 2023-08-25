import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert, message, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { useCategory } from "hooks/category.hook";
import { usePost } from "hooks/post.hook";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { useFormInit } from "hooks/shared/form-init.hook";
import { IPost, emptyPost } from "models/post";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  formMode: UpdateMode;
};
export const PostForm: React.FC<Props> = ({ formMode }) => {
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { post, editPost, addPost } = usePost();
  const { categories } = useCategory();
  const { formError } = useFormErrors();
  const { setShow } = useModalContext();
  const { user } = useAuth();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  console.log("fileList: ", fileList)
  initFormData(form, formMode, post);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onFinish = async (values: IPost) => {
    setSubmitting(true);
    setSubmitted(false);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("authorId", user.id);
    formData.append("categoryId", values.categoryId);

    // Append the selected file(s) to the FormData object
    fileList.forEach((file: any) => {
      console.log("search:", file.originFileObj);
      formData.append("imageUrl", file);
    });

    if (formMode === UpdateMode.ADD) {
      const feedback = await addPost(formData as any);
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
      const feedback = await editPost(formData as any);
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

  const uploadProps = {
    onRemove: (file) => {
      setFileList((prevFileList) =>
        prevFileList.filter((item: any) => item.uid !== file.uid)
      );
    },
    beforeUpload: (file) => {
      setFileList((prevFileList) => [...prevFileList, file]);
      return false;
    },
    fileList,
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {}, [hasSubmitted]);

  return (
    <>
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="categoryId"
          label="Category"
          requiredMark
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Category is required",
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
            options={categories.map((c) => {
              return {
                value: c.id,
                label: c.name,
              };
            })}
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
          label="Upload"
          requiredMark
          style={{ marginBottom: 3 }}
          rules={[
            {
              required: true,
              message: "Upload is required",
            },
          ]}
          valuePropName="fileList" getValueFromEvent={normFile}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
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
