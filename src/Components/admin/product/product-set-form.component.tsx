import { Button, Form, Steps, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductFormStepOne from "./product-form-step-one.component";
import ProductFormStepTwo from "./product-form-step-two.component";
import ProductFormStepUploads from "./product-form-step-uploads.component";
import { useFormInit } from "hooks/shared/form-init.hook";
import { useForm } from "antd/es/form/Form";
import { useProduct } from "hooks/product.hook";
import { useCategory } from "hooks/category.hook";
import { useTag } from "hooks/tag.hook";
import { useModalContext } from "context/app-modal.context";
import { useStore } from "hooks/store.hook";
import { IProduct, ProductFormData, emptyProduct } from "models/product.model";
import { UpdateMode } from "models/shared/update-mode.enum";
import { useUpload } from "hooks/shared/upload.hook";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";

const steps = [
  {
    title: "Product Details",
    content: <ProductFormStepOne />,
  },
  {
    title: "Product Description",
    content: <ProductFormStepTwo />,
  },
  {
    title: "Product Images",
    content: <ProductFormStepUploads />,
  },
];

type Props = {
  formMode: UpdateMode;
};

const ProductStepForm: React.FC<Props> = ({ formMode }) => {
  const [current, setCurrent] = useState(0);
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { product, addProduct, editProduct } = useProduct();
  const { categories } = useCategory();
  const { tags } = useTag();
  const { setShow } = useModalContext();
  const { getUserStore } = useStore();
  const { fileList } = useUpload();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    setSubmitted(false);

    setSubmitting(true);
    setSubmitted(false);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("shortDescription", values.shortDescription);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId);
    // values.tags.forEach((tag) => {
    formData.append("tags", JSON.stringify(values.tags));
    // });
    formData.append("amount", values.amount.toString());
    formData.append("qtty", values.qtty.toString());
    formData.append("storeId", `${getUserStore()?.id}`);

    // Append the selected file(s) to the FormData object
    fileList.forEach((file: any) => {
      formData.append("productImages", file);
    });

    console.log("fileList: ", fileList);
    if (formMode === UpdateMode.ADD) {
      const feedback = await addProduct(formData);
      if (feedback) {
        message.success("Product created successfully!");
        setShow(false);
      } else {
        message.error("failed to create");
        setShow(true);
        setSubmitted(true);
      }
    }

    const formData2: ProductFormData = {
      ...formData,
      id: product.id,
    };

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editProduct(formData2);
      if (feedback) {
        message.success("Product updated successfully!");
        setShow(false);
      } else {
        message.error("failed to update");
        setSubmitted(true);
        setShow(true);
      }
    }
    setSubmitting(false);
  };

  useEffect(() => {
    initFormData(form, formMode, product);
  }, [hasSubmitted]);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    border: `1px dashed #ddd`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} />
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              disabled={submitting}
            >
              Submit
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default ProductStepForm;
