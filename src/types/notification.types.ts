export enum NotificationType {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}

export enum NotificationTranslations {
  EN = "en",
  ES = "es",
}

export type NotificationOptions = {
  autoClose?: number | false;
  closeButton?: boolean;
  limit?: number;
  closeOnClick?: boolean;
};

export interface NotificationMessage {
  id: string;
  message: {
    [key in NotificationTranslations]: string;
  };
  type: NotificationType;
  options?: NotificationOptions;
}

export type CreateNotificationMessage = (
  id: string,
  enMessage: string,
  esMessage: string,
  type: NotificationType,
  options?: NotificationOptions,
) => NotificationMessage;
