import BannerIndexComponent from "components/product/banner.component";
import FilterComponent from "components/product/filter.component";
import ProductList from "components/product/product-list.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const ProductPage: React.FC = () => {
  return (
    <GeneralAppShell>
      {/* search component */}
      <FilterComponent />
      {/* banner */}
      <BannerIndexComponent />
      {/* product list */}
      <ProductList />
    </GeneralAppShell>
  );
};

export default ProductPage;
