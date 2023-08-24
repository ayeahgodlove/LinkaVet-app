import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { IUser } from "models/user.model";
import { loginUser, logoutFun, logoutUser, registerUser } from "redux/auth/auth.slice";

const useAuth = () => {
  const user = useSelector<IRootState, IUser>((state) => state.auth.user);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.auth.isLoading
  );
  const isAuthenticated = useSelector<IRootState, boolean>(
    (state) => state.auth.isAuthenticated
  );

  const dispatch = useDispatch();
  const logoutUserFunction = useCallback(() => {
    dispatch(logoutUser());
    dispatch(logoutFun() as any)
  }, [dispatch]);

  const loginUserFunction = useCallback(
    (user: { email: string; password: string }) => {
      dispatch(
        loginUser({ email: user.email, password: user.password }) as any
      );
      // dispatch(setUser())
    },
    [dispatch]
  );

  const registerUserFunction = useCallback(
    (user: IUser) => {
      dispatch(registerUser(user) as any);
    },
    [dispatch]
  );

  useEffect(() => {}, [
    isLoading,
    isAuthenticated,
    user,
    logoutUserFunction,
    loginUserFunction,
    registerUserFunction,
  ]);
  return {
    user,
    logoutUserFunction,
    loginUserFunction,
    registerUserFunction,
    isLoading,
    isAuthenticated,
  };
};

export { useAuth };
