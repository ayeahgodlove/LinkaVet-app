import { Button, Card, Carousel, Col, List, Space, Typography } from "antd";
import { IProduct } from "models/product.model";
import React from "react";
import "./product.style.scss";
import { RiHeartFill } from "react-icons/ri";
import RaterComponent from "components/shared/rate.component";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { API_URL_UPLOADS_PRODUCTS } from "config/constant";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import { FiMinus, FiPlus } from "react-icons/fi";

const { Meta } = Card;
interface IProp {
  product: IProduct;
}

interface IProps {
  products: IProduct[];
  resultProducts: IProduct[];
  classProp?: boolean;
}
const GridView: React.FC<IProps> = ({
  products,
  resultProducts,
  classProp = false,
}) => {
  return (
    <>
      {products && products.length > 0 ? (
        <List
          className={classProp ? "" : "product-list"}
          grid={{
            gutter: 0,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={
            resultProducts && resultProducts.length > 0
              ? resultProducts
              : products
          }
          renderItem={(product) => (
            <GridProductCard key={product.id} product={product} />
          )}
        />
      ) : (
        <Col span={24}>
          <NoContent title="No products to display at the moment" />
        </Col>
      )}
    </>
  );
};

export const GridProductCard: React.FC<IProp> = ({ product }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    removeFromCart,
    decreaseCartQuantity,
  } = useShoppingCart();
  const quantity = getItemQuantity(product.id);
  return (
    <>
      <List.Item
        key={product.id}
        className="product-list-item"
        style={{ padding: "4px 8px" }}
      >
        <Card
          bordered={false}
          style={{ padding: 0 }}
          bodyStyle={{
            paddingTop: 15,
            paddingBottom: 8,
            paddingLeft: 8,
            paddingRight: 8,
          }}
          cover={
            <Carousel
              autoplay
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              {product.productImages.map((image) => (
                <img
                  key={image.id}
                  style={{
                    // objectFit: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    width: "100%",
                  }}
                  alt={product.shortDescription}
                  src={`${API_URL_UPLOADS_PRODUCTS}/${image.imageUrl}`}
                />
              ))}
            </Carousel>
          } //can implement banner for product cover
          className="product-card"
        >
          <p style={{ textAlign: "center", marginBottom: 5 }}>
            {product.shortDescription}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ width: 120 }}>
              <Meta title={product.name} description={<RaterComponent />} />
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ marginBottom: 5 }}>
                <b>{"$" + product.amount}</b>
              </p>
              {quantity === 0 ? (
                <Button
                  type="default"
                  size="middle"
                  style={{ borderRadius: 15 }}
                  onClick={() => increaseCartQuantity(product.id)}
                >
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
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "0.5rem",
                    }}
                  >
                    <Button
                      icon={<FiMinus />}
                      size="small"
                      onClick={() => decreaseCartQuantity(product.id)}
                    />
                    <small>
                      <Typography.Title level={5} style={{ display: "inline" }}>
                        {quantity}
                      </Typography.Title>{" "}
                      in cart
                    </small>
                    <Space
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      size={"small"}
                    >
                      <Button
                        icon={<FiPlus />}
                        size="small"
                        onClick={() => increaseCartQuantity(product.id)}
                      />
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Space>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button
            type="link"
            className="add-to-fav-btn"
            icon={<RiHeartFill size={30} className="add-to-fav" />}
          />
        </Card>
      </List.Item>
    </>
  );
};

export default GridView;
