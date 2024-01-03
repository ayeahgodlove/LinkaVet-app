import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { useUpload } from "hooks/shared/upload.hook";
import React from "react";

const ProductFormStepUploads = () => {
  const { beforeUpload, onRemove, normFile, fileList } = useUpload();

  return (
    <div style={{ padding: 10 }}>
      <Form.Item
        name="productImages"
        label="Upload Product Images"
        requiredMark
        style={{ marginBottom: 3 }}
        rules={[
          {
            required: true,
            message: "Upload is required",
          },
        ]}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          beforeUpload={beforeUpload}
          onRemove={onRemove}
          name="productImages"
          fileList={fileList}
          type="drag"
          style={{
            padding: "1rem",
          }}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Form.Item>
    </div>
  );
};

export default ProductFormStepUploads;
