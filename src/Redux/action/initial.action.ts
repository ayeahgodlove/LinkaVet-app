import { fetchCategoriesAsync } from "redux/category.slice";
import { fetchDocumentsAsync } from "redux/document.slice";
import { fetchPostsAsync } from "redux/post.slice";
import { fetchProductsAsync } from "redux/product.slice";
import { AppThunk } from "redux/store";

export const initialDataAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchPostsAsync());
    // dispatch(fetchProductsAsync());
    dispatch(fetchDocumentsAsync());
  } catch (error) {
    console.log(error);
  }
};
