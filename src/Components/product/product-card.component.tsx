import { Button, Card, Col, List, Space } from "antd";
import { IProduct } from "models/product.model";
import React from "react";
import "./product.style.scss";
import { RiHeartFill } from "react-icons/ri";
import RaterComponent from "components/shared/rate.component";
// import { FiPlus } from "react-icons/fi";
import { PlusOutlined } from "@ant-design/icons";

const { Meta } = Card;
interface IProp {
  product: IProduct;
}
const ProductCard: React.FC<IProp> = ({ product }) => {
  return (
    <List.Item
      key={product.id}
      className="product-list-item"
      style={{ padding: "4px 8px" }}
    >
      <Card
        bordered={false}
        style={{ padding: 0 }}
        bodyStyle={{ paddingTop: 10 }}
        cover={<img alt={product.description} src={product.productImages[0]} />} //can implement banner for product cover
        className="product-card"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Meta title={product.name} description={<RaterComponent />} />
          </div>

          <div style={{ textAlign: "right"}}>
            <p style={{ marginBottom:5}}>
              <b>{"$" + product.amount}</b>
            </p>
            <Button type="default" size="large" style={{ borderRadius: 15 }}>
              <Space
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PlusOutlined />
                <span>Add To Cart</span>
              </Space>
            </Button>
          </div>
        </div>
        <Button
          type="link"
          className="add-to-fav-btn"
          icon={<RiHeartFill size={30} className="add-to-fav" />}
        />
      </Card>
    </List.Item>
  );
};

export default ProductCard;
