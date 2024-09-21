import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layouts/Layout";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Layout />}></Route>)
  );

  return <RouterProvider router={router} />;
}
