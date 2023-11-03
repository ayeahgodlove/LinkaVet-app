import { Card, Col } from "antd";
import GridView, {
  GridProductCard,
} from "components/product/product-card-grid.component";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useProduct } from "hooks/product.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const ShoppingCartPage: React.FC = () => {
  const { cartItems, findMatchingProducts } = useShoppingCart();
  const { products } = useProduct();

  const matchingProducts = findMatchingProducts(products, cartItems);

  return (
    <GeneralAppShell>
      <Col xs={22} md={20} lg={18} style={{ margin: "3rem auto" }}>
        {cartItems && cartItems.length > 0 ? (
          <GridView products={matchingProducts} resultProducts={[]} />
        ) : (
          <NoContent title="Your shopping cart is empty at the moment" />
        )}
      </Col>
    </GeneralAppShell>
  );
};

export default ShoppingCartPage;
