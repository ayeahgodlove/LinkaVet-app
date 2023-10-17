import { Button, Card, Carousel, Col, List, Row, Space } from "antd";
import { IProduct } from "models/product.model";
import React, { useState } from "react";
import "./product.style.scss";
import RaterComponent from "components/shared/rate.component";
import { PlusOutlined } from "@ant-design/icons";
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
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./product-list-view.style.scss";

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
        <Card
          key={item.id}
          bordered={false}
          bodyStyle={{ padding: 0 }}
        >
          <ListViewProduct product={item} />
        </Card>
      )}
    />
  );
};
const ListViewProduct: React.FC<IProp> = ({ product }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePreviousClick = () => {
    setSlideIndex((prevSlideIndex) => prevSlideIndex - 1);
  };

  const handleNextClick = () => {
    setSlideIndex((prevSlideIndex) => prevSlideIndex + 1);
  };

  const addToCartButton = () => {
    
  }

  return (
    <List.Item key={product.id}>
      <Row gutter={[16,8]}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <RaterComponent fontSize={20} />
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ marginBottom: 5 }}>
                <b>{"$" + product.amount}</b>
              </p>
              <Button type="default" size="middle" style={{ borderRadius: 15 }} onClick={addToCartButton}>
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
        </Col>
      </Row>
    </List.Item>
  );
};

export default ListView;
