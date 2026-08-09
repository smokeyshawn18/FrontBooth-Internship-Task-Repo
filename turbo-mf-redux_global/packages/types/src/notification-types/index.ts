export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface NotificationState {
  queue: Notification[];
}
