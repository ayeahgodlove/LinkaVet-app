import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { IProduct } from "models/product.model";
import {
  addProductSuccess,
  editProductSuccess,
  fetchProductsAsync,
  setActiveProduct,
} from "../redux/product.slice";
import { ProductService } from "services/product.service";
const useProduct = () => {
  const products = useSelector<IRootState, IProduct[]>((state) => state.product.products);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.product.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.product.initialFetch
  );
  const product = useSelector<IRootState, IProduct>((state) => state.product.product);

  const dispatch = useDispatch();

  const loadProducts = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchProductsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addProduct = async (product: IProduct) => {
    return await ProductService.create(product)
      .then((productResponse) => {
        dispatch(addProductSuccess(productResponse.data));
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  };

  const setProduct = (product: IProduct) => {
    dispatch(setActiveProduct(product));
  };

  const editProduct = async (product: IProduct) => {
    return await ProductService.update(product)
      .then((productResponse) => {
        dispatch(editProductSuccess(productResponse.data));
        setProduct(productResponse.data);
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  };

  useEffect(() => {
    loadProducts();
  }, [product, products, isLoading, initialFetch, loadProducts]);

  return {
    product,
    products,
    isLoading,
    initialFetch,
    addProduct,
    editProduct,
    setProduct,
  };
};

export { useProduct };
