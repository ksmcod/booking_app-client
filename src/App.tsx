import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import ProtectedRoutes from "./utils/ProtectedRoutes";

import {
  IndexPage,
  LoginPage,
  RegisterPage,
  AddHotelPage,
  MyHotelsPage,
} from "./pages";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="search" element={<p>Search page</p>} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoutes />}>
          <Route path="add-hotel" element={<AddHotelPage />} />
          <Route path="my-hotels" element={<MyHotelsPage />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
