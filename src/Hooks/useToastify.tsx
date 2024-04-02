import { toast } from "react-toastify";
import {
  NotificationMessage,
  NotificationTranslations,
} from "../types/notification.types"; // Assuming the path is correct

import {
  NotificationId,
  NotificationMessages,
} from "../constants/NOTIFICATION_MESSEGES";
import { fireToast } from "../utils/fireToast";

const useToastify = () => {
  const toastify = (
    notificationId: NotificationId,
    language?: NotificationTranslations,
  ) => {
    // Look up the notification message based on ID
    const notification = NotificationMessages[notificationId];
    if (!notification) return null;

    const adjustedNotification: NotificationMessage = {
      ...notification,
      message: {
        [NotificationTranslations.EN]:
          notification.message[NotificationTranslations.EN],
        [NotificationTranslations.ES]:
          notification.message[NotificationTranslations.ES],
      },
    };

    return fireToast(adjustedNotification, language);
  };

  toastify.dismiss = toast.dismiss;

  return toastify;
};

export default useToastify;
