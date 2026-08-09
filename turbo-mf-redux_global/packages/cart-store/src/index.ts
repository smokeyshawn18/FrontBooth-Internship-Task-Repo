export { store } from "./store";
export type { RootState, AppDispatch } from "./store";
export {
  addItem,
  removeItem,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "./cart.slice";
export { useAppDispatch, useAppSelector } from "./hooks";
