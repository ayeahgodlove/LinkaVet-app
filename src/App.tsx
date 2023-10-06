import React from "react";
import "./App.css";
import AppRouteProvider from "routes/app-route-provider";
import { Provider } from "react-redux";
import store, { persistor } from "redux/store";
import withLoading from "components/shared/with-loading/with-loading.component";
import { PersistGate } from "redux-persist/integration/react";
import { AppModalProvider } from "context/app-modal.context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppModalProvider>
            <AppRouteProvider />
          </AppModalProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default withLoading(App);
