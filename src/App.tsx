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
  ViewHotelPage,
  BookingPage,
  UserBookingsPage,
  MyAccountPage,
} from "./pages";
import Redirect from "./utils/Redirect";
import SearchResultsPage from "./pages/SearchResults/SearchResultsPage";
import ProtectAuthRoutes from "./utils/ProtectAuthRoutes";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />

        <Route element={<ProtectAuthRoutes />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route path="search" element={<SearchResultsPage />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoutes />}>
          <Route path="add-hotel" element={<AddHotelPage />} />
          <Route path="my-hotels" element={<MyHotelsPage />} />

          <Route path="my-account" element={<MyAccountPage />} />

          <Route path="edit-hotel">
            <Route index element={<Redirect target="/my-hotels" />} />
            <Route path=":slug" element={<EditHotelPage />} />
          </Route>

          <Route path="book">
            <Route index element={<Redirect target="/" />} />
            <Route path=":slug" element={<BookingPage />} />
          </Route>

          <Route path="my-bookings" element={<UserBookingsPage />} />
        </Route>

        <Route path="hotel">
          <Route index element={<Redirect target="/" />} />
          <Route path=":slug" element={<ViewHotelPage />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound404 />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
