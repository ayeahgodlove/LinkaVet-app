import { IRoute } from "models/route.model";
import NotFoundPage from "pages/404_Page";
import ActivationPage from "pages/activation.page";
import AdminBannerDetailPage from "pages/admin/banner/banner-detail.page";
import AdminBannerPage from "pages/admin/banner/banner.page";
import AdminCategoryDetailPage from "pages/admin/category/category-detail.page";
import AdminCategoryPage from "pages/admin/category/category.page";
import AdminDocumentDetailPage from "pages/admin/document/document-detail.page";
import AdminDocumentPage from "pages/admin/document/document.page";
import AdminPostDetailPage from "pages/admin/post/post-detail.page";
import AdminPostPage from "pages/admin/post/post.page";
import AdminProductDetailPage from "pages/admin/product/product-detail.page";
import AdminProductPage from "pages/admin/product/product.page";
import AdminReviewDetailPage from "pages/admin/review/review-detail.page";
import AdminReviewPage from "pages/admin/review/review.page";
import AdminStoreDetailPage from "pages/admin/store/store-detail.page";
import AdminStorePage from "pages/admin/store/store.page";
import AdminTagDetailPage from "pages/admin/tag/tag-detail.page";
import AdminTagPage from "pages/admin/tag/tag.page";
import AdminUserDetailPage from "pages/admin/user/user-detail.page";
import AdminUserPage from "pages/admin/user/user.page";
import ForgotPasswordPage from "pages/auth/forgot-password.page";
import LoginPage from "pages/auth/login.page";
import RegisterPage from "pages/auth/register.page";
import CallbackPage from "pages/callback.page";
import DashboardPage from "pages/dashboard/dashboard.page";
import PostPage from "pages/post/index.page";
import PostDetailPage from "pages/post/post-detail.page";
import ProductPage from "pages/product/index.page";
import ProductDetailPage from "pages/product/product-detail.page";
import WelcomePage from "pages/welcome.page";
import React from "react";
import ProductCreatePage from "pages/admin/product/product-create.page";
import ProductEditPage from "pages/admin/product/product-edit.page";
import AdminOrderPage from "pages/admin/order/order.page";
import AdminOrderDetailPage from "pages/admin/order/order-detail.page";
import AdminPaymentPage from "pages/admin/payment/payment.page";
import AdminPaymentDetailPage from "pages/admin/payment/payment-detail.page";
import ShoppingCartPage from "pages/shopping-cart/shopping-cart.page";

export const routes: IRoute[] = [
  {
    path: "/activation/:activationToken",
    private: false,
    exact: true,
    component: <ActivationPage />,
  },
  /**
   * callback route
   */
  {
    path: "/callback",
    private: false,
    exact: true,
    component: <CallbackPage />,
  },
  /**
   * Welcome
   */
  {
    path: "/",
    private: false,
    exact: true,
    component: <WelcomePage />,
  },
  {
    path: "/products",
    private: false,
    exact: true,
    component: <ProductPage />,
  },
  {
    path: "/products/:name",
    private: false,
    exact: true,
    component: <ProductDetailPage />,
  },
  {
    path: "/shopping-cart",
    private: false,
    exact: true,
    component: <ShoppingCartPage />,
  },
  {
    path: "/orders",
    private: false,
    exact: true,
    component: <ShoppingCartPage />,
  },
  {
    path: "/posts",
    private: false,
    exact: true,
    component: <PostPage />,
  },
  {
    path: "/posts/:name",
    private: false,
    exact: true,
    component: <PostDetailPage />,
  },

  /**
   * dashboard route
   */
  {
    path: "/dashboard",
    private: true,
    exact: true,
    component: <DashboardPage />,
  },

  /**
   * Auth
   */
  {
    path: "/auth/login",
    private: false,
    exact: true,
    component: <LoginPage />,
  },
  {
    path: "/auth/register",
    private: false,
    exact: true,
    component: <RegisterPage />,
  },
  {
    path: "/auth/forgot-password",
    private: false,
    exact: true,
    component: <ForgotPasswordPage />,
  },

  // admin section
  // private routes
  {
    path: "/admin/categories",
    private: true,
    exact: true,
    component: <AdminCategoryPage />,
  },
  {
    path: "/admin/categories/:name",
    private: true,
    exact: true,
    component: <AdminCategoryDetailPage />,
  },
  {
    path: "/admin/tags",
    private: true,
    exact: true,
    component: <AdminTagPage />,
  },
  {
    path: "/admin/tags/:name",
    private: true,
    exact: true,
    component: <AdminTagDetailPage />,
  },

  {
    path: "/admin/posts",
    private: true,
    exact: true,
    component: <AdminPostPage />,
  },
  {
    path: "/admin/posts/:name",
    private: true,
    exact: true,
    component: <AdminPostDetailPage />,
  },

  {
    path: "/admin/stores",
    private: true,
    exact: true,
    component: <AdminStorePage />,
  },
  {
    path: "/admin/stores/:name",
    private: true,
    exact: true,
    component: <AdminStoreDetailPage />,
  },

  {
    path: "/admin/products",
    private: true,
    exact: true,
    component: <AdminProductPage />,
  },
  {
    path: "/admin/products/create",
    private: true,
    exact: true,
    component: <ProductCreatePage />,
  },
  {
    path: "/admin/products/:name/edit",
    private: true,
    exact: true,
    component: <ProductEditPage />,
  },
  {
    path: "/admin/products/:name",
    private: true,
    exact: true,
    component: <AdminProductDetailPage />,
  },

  {
    path: "/admin/documents",
    private: true,
    exact: true,
    component: <AdminDocumentPage />,
  },
  {
    path: "/admin/documents/:name",
    private: true,
    exact: true,
    component: <AdminDocumentDetailPage />,
  },
  {
    path: "/admin/banners",
    private: true,
    exact: true,
    component: <AdminBannerPage />,
  },
  {
    path: "/admin/banners/:title",
    private: true,
    exact: true,
    component: <AdminBannerDetailPage />,
  },

  // admin section
  // private routes
  {
    path: "/admin/reviews",
    private: true,
    exact: true,
    component: <AdminReviewPage />,
  },
  {
    path: "/admin/reviews/:id",
    private: true,
    exact: true,
    component: <AdminReviewDetailPage />,
  },
  {
    path: "/admin/orders",
    private: true,
    exact: true,
    component: <AdminOrderPage />,
  },
  {
    path: "/admin/orders/:id",
    private: true,
    exact: true,
    component: <AdminOrderDetailPage />,
  },
  {
    path: "/admin/payments",
    private: true,
    exact: true,
    component: <AdminPaymentPage />,
  },
  {
    path: "/admin/payments/:id",
    private: true,
    exact: true,
    component: <AdminPaymentDetailPage />,
  },
  {
    path: "/admin/users",
    private: true,
    exact: true,
    component: <AdminUserPage />,
  },
  {
    path: "/admin/users/:id",
    private: true,
    exact: true,
    component: <AdminUserDetailPage />,
  },
  {
    // default not found route
    path: "*",
    private: false,
    exact: false,
    component: <NotFoundPage />,
  },
];
