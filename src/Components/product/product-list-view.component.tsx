import {
  Button,
  Card,
  Carousel,
  Col,
  List,
  Row,
  Space,
  Typography,
} from "antd";
import { IProduct } from "models/product.model";
import React, { useState } from "react";
import "./product.style.scss";
import RaterComponent from "components/shared/rate.component";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { API_URL_UPLOADS_PRODUCTS } from "config/constant";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import "./product-list-view.style.scss";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";

interface IProp {
  product: IProduct;
}

interface IProps {
  products: IProduct[];
  resultProducts: IProduct[];
}
const ListView: React.FC<IProps> = ({ products, resultProducts }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={
        resultProducts && resultProducts.length > 0 ? resultProducts : products
      }
      renderItem={(item) => (
        <Card key={item.id} bordered={false} bodyStyle={{ padding: 0 }}>
          <ListViewProduct product={item} />
        </Card>
      )}
    />
  );
};
const ListViewProduct: React.FC<IProp> = ({ product }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const { getItemQuantity } = useShoppingCart();
  const quantity = getItemQuantity(product.id);
  const handlePreviousClick = () => {
    setSlideIndex((prevSlideIndex) => prevSlideIndex - 1);
  };

  const handleNextClick = () => {
    setSlideIndex((prevSlideIndex) => prevSlideIndex + 1);
  };

  const addToCartButton = () => {};

  return (
    <List.Item key={product.id}>
      <Row gutter={[16, 8]}>
        <Col xs={24} md={6}>
          <CarouselProvider
            naturalSlideWidth={10}
            naturalSlideHeight={6}
            totalSlides={product.productImages.length}
            // isIntrinsicHeight={true}
          >
            <Slider>
              {product.productImages.map((image, index) => (
                <Slide index={index} key={index}>
                  <Image
                    style={{
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      aspectRatio: "1/1",
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                    alt={product.shortDescription}
                    src={`${API_URL_UPLOADS_PRODUCTS}/${image.imageUrl}`}
                    hasMasterSpinner={false}
                  />
                </Slide>
              ))}
            </Slider>
            <Space style={{ marginTop: 15 }} className="controls">
              <ButtonBack
                onClick={handlePreviousClick}
                className="btn-arrow reverse-arrow"
              >
                <FiChevronLeft size={25} />
              </ButtonBack>
              <DotGroup className="dot-group" />
              <ButtonNext onClick={handleNextClick} className="btn-arrow">
                <FiChevronRight size={25} />
              </ButtonNext>
            </Space>
          </CarouselProvider>
        </Col>
        <Col
          xs={24}
          md={18}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
          <Row justify={"center"} align={"top"}>
            <Col xs={12}>
              <RaterComponent fontSize={20} />
            </Col>

            <Col
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <p style={{ marginBottom: 5 }}>
                <b>{"$" + product.amount}</b>
              </p>
              {quantity === 0 ? (
                <Button
                  type="default"
                  size="middle"
                  style={{ borderRadius: 15 }}
                  onClick={addToCartButton}
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
                    <Button icon={<FiMinus />} />
                    <div>
                      <Typography.Title level={4} style={{ display: "inline" }}>
                        {quantity}
                      </Typography.Title>{" "}
                      in cart
                    </div>
                    <Button icon={<FiPlus />} />
                  </div>
                  <Button size="small">
                    <Space
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      size={"small"}
                    >
                      <DeleteOutlined />
                      <span>Remove</span>
                    </Space>
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </List.Item>
  );
};

export default ListView;
