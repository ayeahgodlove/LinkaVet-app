import { Col } from "antd";
import React from "react";
import { DebounceSelectComponent } from "./deboune-search.component";

const FilterComponent: React.FC = () => {
  return (
    <Col
      style={{ margin: "0 auto", marginTop: 40 }}
      sm={20}
      md={18}
      lg={15}
      xl={15}
    >
      <DebounceSelectComponent />
    </Col>
  );
};

export default FilterComponent;
