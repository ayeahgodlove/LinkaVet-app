import { Button } from "antd";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const BackButton: React.FC<{ title: string}> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button icon={<FiArrowLeft />} type="link" onClick={() => navigate(-1)}>
        Back to {title} page
      </Button>
    </>
  );
};

export default BackButton;
