import FilterComponent from "components/product/filter.component";
import ProductList from "components/product/product-list.component";
import { useProduct } from "hooks/product.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useEffect } from "react";
import { fetchproductSuccess } from "redux/product.slice";
import { ProductService } from "services/product.service";

const ProductPage: React.FC = () => {
  const { products } = useProduct();

  useEffect(() => {
    const getProducts = async () => {
      const products = await ProductService.list();
      fetchproductSuccess(products);
      return products;
    };

    getProducts();
  }, []);

  return (
    <GeneralAppShell>
      <h1 style={{ padding: 30 }}> Product Page Page</h1>
      {/* search component */}
      <FilterComponent />
      {/* product list */}
      <ProductList products={products} />
    </GeneralAppShell>
  );
};

export default ProductPage;
