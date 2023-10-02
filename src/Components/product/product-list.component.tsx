import { Col, List } from "antd";
import React from "react";
import ProductCard from "./product-card.component";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { useProduct } from "hooks/product.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import { IProduct } from "models/product.model";

interface Props {
  slice?: boolean;
  products: IProduct[]
}
const ProductList: React.FC<Props> = ({ slice = false, products }) => {
  return (
    <>
      {products && products.length > 0 ? (
        <List
          className="product-list"
          grid={{
            gutter: 0,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={slice ? products.slice(0, 4) : products}
          renderItem={(product) => (
            <Link
              key={product.id}
              to={`/products/${slugify(product.name, { lower: true })}`}
            >
              <ProductCard product={product} />
            </Link>
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

export default ProductList;
