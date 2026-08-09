export * from "./cart-types";
export * from "./notification-types";

export type EventMap = {
  "cart:add": { id: string; name: string; price: number };
};
