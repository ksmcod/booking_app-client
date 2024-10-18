import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        toastOptions={{
          duration: 5000,
          position: "top-center",
          success: {
            className:
              "border-b-4 rounded-sm w-full border-green-500 font-bold text-emerald-900 bg-emerald-100  shadow-md capitalize",
            icon: null,
          },
          error: {
            className:
              "border-b-4 rounded-sm w-full border-red-500 font-bold text-red-900 bg-red-100 shadow-md capitalize",
            icon: null,
          },
          blank: {
            className:
              "border-b-4 rounded-sm w-full border-neutral-400 font-bold text-neutral-900 bg-neutral-100  shadow-md capitalize",
            icon: null,
          },
        }}
      />
      <App />
    </Provider>
  </StrictMode>
);
