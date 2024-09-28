import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Index from "./pages/Index";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="register" element={<Register />} />
        <Route path="search" element={<p>Search page</p>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
