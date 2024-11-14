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
  EditHotelPage,
  NotFound404,
} from "./pages";
import Redirect from "./utils/Redirect";
import SearchResultsPage from "./pages/SearchResults/SearchResultsPage";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="search" element={<SearchResultsPage />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoutes />}>
          <Route path="add-hotel" element={<AddHotelPage />} />
          <Route path="my-hotels" element={<MyHotelsPage />} />
          <Route path="edit-hotel">
            <Route index element={<Redirect target="/my-hotels" />} />
            <Route path=":slug" element={<EditHotelPage />} />
          </Route>
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound404 />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
