import { toast } from "react-toastify";
import {
  NotificationMessage,
  NotificationTranslations,
} from "../types/notification.types";

export const fireToast = (
  notification: NotificationMessage,
  language?: NotificationTranslations,
) => {
  const { type, message, options } = notification;
  const selectedLanguage =
    language || (process.env.NEXT_PUBLIC_LANGUAJE as NotificationTranslations);

  const translatedMessage = message[selectedLanguage];

  if (!translatedMessage) {
    console.error(
      `No translation found for notification id: ${notification.id}`,
    );
    return null;
  }

  return toast[type](translatedMessage, {
    ...options,
    toastId: notification.id,
  });
};
