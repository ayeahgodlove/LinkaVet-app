import { Card, Col, List, Typography, Input, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import ProductCard from "./product-card.component";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { useProduct } from "hooks/product.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import { ProductService } from "services/product.service";
import { fetchproductSuccess } from "redux/product.slice";
import { IProduct } from "models/product.model";
import search from "utils/search";
import { FiActivity, FiColumns, FiGrid, FiList } from "react-icons/fi";
import ButtonGroup from "antd/es/button/button-group";
import useWindowSize from "hooks/shared/window-resize.hook";

const { Search } = Input;
interface Props {
  slice?: boolean;
}
const ProductList: React.FC<Props> = ({ slice = false }) => {
  const { products } = useProduct();
  const [query, setQuery] = useState<string>("");
  const { width } = useWindowSize();

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  console.log("slice: ", slice);

  const resultProducts: IProduct[] =
    products && products.length
      ? products.filter((product) => search(product, ["name"], query, false))
      : [];

  useEffect(() => {
    const getProducts = async () => {
      const products = await ProductService.list();
      fetchproductSuccess(products);
      return products;
    };

    getProducts();
  }, []);

  return (
    <>
      <Card
        title={
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {width >= 911 && (
                <Space>
                  <Typography.Title level={5}>Products</Typography.Title>
                  <Typography.Text>
                    (Showing 1- 40 products of 1,000)
                  </Typography.Text>
                </Space>
              )}

              <>
                <Space>
                  <Search
                    placeholder="Search products"
                    onChange={(product) => onChange(product)}
                  />
                  <ButtonGroup>
                    <Button type="ghost" icon={<FiList size={25} />} />
                    {/* <Button type="ghost" icon={<FiColumns size={25} />} /> */}
                    <Button type="ghost" icon={<FiGrid size={25} />} />
                  </ButtonGroup>
                </Space>
              </>
            </div>
          </>
        }
        bodyStyle={{ background: "transparent" }}
        size="small"
      >
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
            // dataSource={
            //   resultProducts && resultProducts.length > 0
            //     ? resultProducts
            //     : products
            // }
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
      </Card>
    </>
  );
};

export default ProductList;
