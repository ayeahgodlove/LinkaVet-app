import { IRoute } from "models/route.model";
import NotFoundPage from "pages/404_Page";
import AdminCategoryDetailPage from "pages/admin/category/category-detail.page";
import AdminCategoryPage from "pages/admin/category/category.page";
import AdminReviewDetailPage from "pages/admin/review/review-detail.page";
import AdminReviewPage from "pages/admin/review/review.page";
import UserDashboard from "pages/auth/dashboard/user-dashboard.page";
import ForgotPasswordPage from "pages/auth/forgot-password.page";
import LoginPage from "pages/auth/login.page";
import RegisterPage from "pages/auth/register.page";
import WhoAreYouPage from "pages/auth/who-are-you.page";
import CallbackPage from "pages/callback.page";
import DashboardPage from "pages/dashboard.page";
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
    path: "/login",
    private: true,
    exact: true,
    component: <LoginPage />,
  },
  {
    path: "/register",
    private: true,
    exact: true,
    component: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    private: true,
    exact: true,
    component: <ForgotPasswordPage />,
  },
  {
    path: "/who-are-you",
    private: true,
    exact: true,
    component: <WhoAreYouPage />,
  },
  {
    path: "/user-dashboard/:userCode",
    private: true,
    exact: true,
    component: <UserDashboard />,
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
