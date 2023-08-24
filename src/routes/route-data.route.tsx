import { IRoute } from "models/route.model";
import NotFoundPage from "pages/404_Page";
import AdminCategoryDetailPage from "pages/admin/category/category-detail.page";
import AdminCategoryPage from "pages/admin/category/category.page";
import AdminDocumentDetailPage from "pages/admin/document/document-detail.page";
import AdminDocumentPage from "pages/admin/document/document.page";
import AdminPostDetailPage from "pages/admin/post/post-detail.page";
import AdminPostPage from "pages/admin/post/post.page";
import AdminReviewDetailPage from "pages/admin/review/review-detail.page";
import AdminReviewPage from "pages/admin/review/review.page";
import ForgotPasswordPage from "pages/auth/forgot-password.page";
import LoginPage from "pages/auth/login.page";
import RegisterPage from "pages/auth/register.page";
import CallbackPage from "pages/callback.page";
import DashboardPage from "pages/dashboard/dashboard.page";
import ProductPage from "pages/product/index.page";
import ProductDetailPage from "pages/product/product-detail.page";
import WelcomePage from "pages/welcome.page";
import React from "react";

export const routes: IRoute[] = [
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
    // default not found route
    path: "*",
    private: false,
    exact: false,
    component: <NotFoundPage />,
  },
];
