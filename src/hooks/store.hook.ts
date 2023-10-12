import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { useFormErrors } from "./shared/form-error.hook";
import { IRootState } from "../redux/store";
import { storeService } from "../services/store.service";
import { useToken } from "./auth/token.hook";
import { IStore } from "models/store";
import { addStoreSuccess, editStoreSuccess, fetchStoresAsync, setActiveStore } from "redux/store.slice";

const useStore = () => {
  const stores = useSelector<IRootState, IStore[]>((state) => state.store.stores);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.store.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.store.initialFetch
  );
  const store = useSelector<IRootState, IStore>((state) => state.store.store);

  const dispatch = useDispatch();
  const { setformError } = useFormErrors()
  const {token} = useToken();

  const loadStores = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchStoresAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addStore = async (store: FormData) => {
    return await storeService.create(store)
      .then((storeResponse) => {
        dispatch(addStoreSuccess(storeResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  const setStore = (store: IStore) => {
    dispatch(setActiveStore(store));
  };

  const editStore = async (store: FormData) => {
    return await storeService.update(store)
      .then((storeResponse) => {
        dispatch(editStoreSuccess(storeResponse.data));
        setStore(storeResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  useEffect(() => {
    // loadStores();
  }, [store, stores, isLoading, initialFetch, loadStores]);

  return {
    store,
    stores,
    isLoading,
    initialFetch,
    addStore,
    editStore,
    setStore,
  };
};

export { useStore };
