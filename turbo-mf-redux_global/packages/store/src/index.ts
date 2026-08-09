export { store } from "./store";
export type { RootState, AppDispatch } from "./store";

export {
  addItem,
  removeItem,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "./slices/cart.slice";
export {
  notify,
  dismissNotification,
  selectNotifications,
} from "./slices/notification.slice";

export { useAppDispatch, useAppSelector } from "./hooks";
