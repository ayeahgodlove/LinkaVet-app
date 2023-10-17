import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from 'redux-persist/lib/storage/session'

import { productReducer } from "./product.slice";
import { userReducer } from "./user.slice";
import { categoryReducer } from "./category.slice";
// import { orderReducer } from "./order.slice";
import { paymentReducer } from "./payment.slice";
import { themeReducer } from "./shared/theme.slice";
import { formErrorReducer } from "./shared/form-error.slice";
import { reviewReducer } from "./review.slice";
import { authReducer } from "./auth/auth.slice";
import { postReducer } from "./post.slice";
import { documentReducer } from "./document.slice";
import { tagReducer } from "./tag.slice"; 
import { tokenReducer } from "./auth/token.slice";
import { subCategoryReducer } from "./sub-category.slice";
import { bannerReducer } from "./banner.slice";
import { storeReducer } from "./store.slice";
import { orderReducer } from "./order.slice";

const middlewares: [any] = [thunkMiddleware];

export const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  tag: tagReducer,
  post: postReducer,
  document: documentReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  order: orderReducer,
  payment: paymentReducer,
  review: reviewReducer,
  theme: themeReducer,
  formError: formErrorReducer,
  auth: authReducer,
  token: tokenReducer,
  banner: bannerReducer,
  store: storeReducer
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: [
    "auth",
    "user",
    "theme",
    "category",
    "subCategory",
    "product",
    "order",
    "review",
    "payment",
    "order",
    "token",
    "post",
    "tag",
    "store"
  ], // Specify the reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(loggerMiddleware)
      .concat(middlewares),
  devTools: true, //change when deploying
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, IRootState, unknown, Action<string>>;

export const persistor = persistStore(store);
export default store;
