import type { Notification, NotificationState } from "@mf/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

const initialState: NotificationState = { queue: [] };

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notify: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.queue.push(action.payload);
      },
      prepare: (message: string, type: Notification["type"] = "info") => ({
        payload: { id: nanoid(), message, type },
      }),
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter((n) => n.id !== action.payload);
    },
  },
});

export const { notify, dismissNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;

export const selectNotifications = (state: {
  notifications: NotificationState;
}) => state.notifications.queue;
