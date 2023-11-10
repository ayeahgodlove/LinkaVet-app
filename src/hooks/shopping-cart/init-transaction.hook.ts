import { IInitTransaction } from "models/init-payment.model";
import { useDispatch, useSelector } from "react-redux";

import { IRootState } from "redux/store";
import { setActiveInitTransaction } from "redux/init-transaction.slice";

const useInitTransaction = () => {
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.initTransaction.isLoading
  );
  const initTransaction = useSelector<IRootState, IInitTransaction>(
    (state) => state.initTransaction.initTransaction
  );

  const dispatch = useDispatch();

  const setInitTransaction = (initTransaction: IInitTransaction) => {
    dispatch(setActiveInitTransaction(initTransaction));
  };

  return {
    setInitTransaction,
    initTransaction,
    isLoading,
  };
};

export { useInitTransaction };
