import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  emptyInitTransaction,
  IInitTransaction,
  IInitTransactionState,
} from "models/init-payment.model";

export const initialState: IInitTransactionState = {
  errors: "",
  initTransaction: emptyInitTransaction,
  isLoading: false,
  initialFetch: true,
};

export const initTransactionSlice = createSlice({
  name: "initTransaction",
  initialState,
  reducers: {
    setActiveInitTransaction: (
      state,
      action: PayloadAction<IInitTransaction>
    ) => {
      state.initTransaction = action.payload;
    },
  },
});

export const { setActiveInitTransaction } = initTransactionSlice.actions;

const reducer = initTransactionSlice.reducer;

export { reducer as initTransactionReducer };
