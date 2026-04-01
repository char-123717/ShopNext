//useDispatch → used to send actions to the Redux store
//useSelector → used to read data (state) from the store
//TypedUseSelectorHook → helps TypeScript understand your state structure
//RootState → the type of your entire Redux state
//AppDispatch → the type of your dispatch function
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

//Creates a typed version of useDispatch that knows about AppDispatch type
//TypeScript knows: all action types, async thunks and gives better autocomplete
export const useAppDispatch = () => useDispatch<AppDispatch>();

//Creates a typed version of useSelector that knows about RootState type
//useAppSelector is a version of useSelector that always uses RootState as its state type
//This means when use useAppSelector, TypeScript will know the shape of state and provide better type checking and autocomplete
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
