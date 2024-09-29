import { useSelector, useDispatch } from "react-redux";
import type { StoreState, AppDispatch } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<StoreState>();
