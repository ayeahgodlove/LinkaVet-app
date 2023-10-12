import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Space,
  Upload,
  message,
} from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import { useStore } from "hooks/store.hook";
import { useModalContext } from "context/app-modal.context";
import { useFormInit } from "hooks/shared/form-init.hook";
import { IStore, emptyStore } from "models/store";
import { useUpload } from "hooks/shared/upload.hook";
import theme from "utils/themeConfig";

type Props = {
  formMode: UpdateMode;
};

const StoreForm: React.FC<Props> = ({ formMode }) => {
  const [form] = Form.useForm();
  const { addStore, editStore, store } = useStore();
  const { user } = useAuth();
  const { setShow } = useModalContext();
  const { initFormData } = useFormInit();
  const { fileList, onChangeUpload, onRemove, beforeUpload, progress } =
    useUpload();

  initFormData(form, formMode, store);

  const onFinish = async (values: IStore) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("userId", user.id);

    // Append the selected file(s) to the FormData object
    fileList.forEach((file: any) => {
      formData.append("imageBannerUrl", file);
    }); 


    if (formMode === UpdateMode.ADD) {
      const feedback = await addStore(formData);
      if (feedback) {
        message.success("Store created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
      }
    }

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editStore(formData);
      if (feedback) {
        message.success("Store updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setShow(true);
      }
    }
  };
  return (
    <ConfigProvider theme={theme}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={emptyStore}
      >
        <Form.Item
          name={"name"}
          label="Name"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"location"}
          label="Adress"
          required={true}
          rules={[
            { required: true, message: "This field is a required field" },
          ]}
          style={{ marginBottom: 10 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="imageBannerUrl"
          label="Upload"
          style={{ marginBottom: 15 }}
          rules={[
            {
              required: true,
              message: "Upload is required",
            },
          ]}
        >
          <Upload
            maxCount={1}
            beforeUpload={beforeUpload}
            onChange={onChangeUpload}
            onRemove={onRemove}
            progress={progress}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form>
    </ConfigProvider>
  );
};

export default StoreForm;
