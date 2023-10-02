import { Col, Input } from "antd";
import React from "react";

const { Search } = Input;
const FilterComponent: React.FC = () => {
  const onSearch = () => {};
  const handleSearchChange = () => {};
  return (
    <Col
      style={{ margin: "0 auto",  marginTop: 40 }}
      sm={20}
      md={18}
      lg={15}
      xl={15}
    >
      <Search
        placeholder="What do you need?"
        onSearch={onSearch}
        onChange={handleSearchChange}
        size="large"
      />
    </Col>
  );
};

export default FilterComponent;
