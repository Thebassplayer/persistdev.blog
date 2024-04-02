import {
  NotificationMessage,
  NotificationTranslations,
  NotificationType,
} from "../types/notification.types";

export enum NotificationId {
  NETWORK_ERROR = "network_error",
  LOGIN_SUCCESS = "login_success",
  LOGOUT_SUCCESS = "logout_success",
  REGISTRATION_SUCCESS = "registration_success",
  INVALID_EMAIL_OR_PASSWORD = "invalid_email_or_password",
  PASSWORD_RESET_SUCCESS = "password_reset_success",
  PASSWORD_CHANGE_SUCCESS = "password_change_success",
  FORM_VALIDATION_ERROR = "form_validation_error",
  ACCESS_DENIED = "access_denied",
  ITEM_NOT_FOUND = "item_not_found",
  SERVER_ERROR = "server_error",
  INVALID_DATA_FROM_API = "invalid_data_from_api",
  DELETE_ORGANIZATION_SUCCESS = "delete_organization_success",
  UPDATE_ORGANIZATION_SUCCESS = "update_organization_success",
  INTERNET_CONNECTION_ERROR = "connection_error",
  INTERNET_CONNECTION_SUCCESS = "connection_success",
  SUBSCRIPTION_SUCCESS = "subscription_success",
  SUBSCRIPTION_ERROR = "subscription_error",
  SUBSCRIPTION_ALREADY_EXISTS = "subscription_already_exists",
}

export const NotificationMessages: Record<NotificationId, NotificationMessage> =
  {
    [NotificationId.NETWORK_ERROR]: {
      id: NotificationId.NETWORK_ERROR,
      message: {
        [NotificationTranslations.EN]:
          "A network error occurred. Please try again later.",
        [NotificationTranslations.ES]:
          "Ocurrió un error de red. Por favor, inténtalo nuevamente más tarde.",
      },
      type: NotificationType.ERROR,
    },
    [NotificationId.LOGIN_SUCCESS]: {
      id: NotificationId.LOGIN_SUCCESS,
      message: {
        [NotificationTranslations.EN]: "Login successful.",
        [NotificationTranslations.ES]: "Inicio de sesión exitoso.",
      },
      type: NotificationType.SUCCESS,
    },
    [NotificationId.LOGOUT_SUCCESS]: {
      id: NotificationId.LOGOUT_SUCCESS,
      message: {
        [NotificationTranslations.EN]: "Logout successful.",
        [NotificationTranslations.ES]: "Cierre de sesión exitoso.",
      },
      type: NotificationType.SUCCESS,
    },
    [NotificationId.REGISTRATION_SUCCESS]: {
      id: NotificationId.REGISTRATION_SUCCESS,
      message: {
        [NotificationTranslations.EN]: "Registration successful.",
        [NotificationTranslations.ES]: "Registro exitoso.",
      },
      type: NotificationType.SUCCESS,
    },
    [NotificationId.INVALID_EMAIL_OR_PASSWORD]: {
      id: NotificationId.INVALID_EMAIL_OR_PASSWORD,
      message: {
        [NotificationTranslations.EN]: "Invalid email or password.",
        [NotificationTranslations.ES]:
          "Correo electrónico o contraseña inválidos.",
      },
      type: NotificationType.ERROR,
    },
    [NotificationId.PASSWORD_RESET_SUCCESS]: {
      id: NotificationId.PASSWORD_RESET_SUCCESS,
      message: {
        [NotificationTranslations.EN]: "Password reset successful.",
        [NotificationTranslations.ES]:
          "Restablecimiento de contraseña exitoso.",
      },
      type: NotificationType.SUCCESS,
    },
    [NotificationId.PASSWORD_CHANGE_SUCCESS]: {
      id: NotificationId.PASSWORD_CHANGE_SUCCESS,
      message: {
        [NotificationTranslations.EN]: "Password change successful.",
        [NotificationTranslations.ES]: "Cambio de contraseña exitoso.",
      },
      type: NotificationType.SUCCESS,
    },
    [NotificationId.FORM_VALIDATION_ERROR]: {
      id: NotificationId.FORM_VALIDATION_ERROR,
      message: {
        [NotificationTranslations.EN]: "Form validation error.",
        [NotificationTranslations.ES]: "Error de validación de formulario.",
      },
      type: NotificationType.ERROR,
    },
    [NotificationId.ACCESS_DENIED]: {
      id: NotificationId.ACCESS_DENIED,
      message: {
        [NotificationTranslations.EN]: "Access denied.",
        [NotificationTranslations.ES]: "Acceso denegado.",
      },
      type: NotificationType.ERROR,
    },
    [NotificationId.ITEM_NOT_FOUND]: {
      id: NotificationId.ITEM_NOT_FOUND,
      message: {
        [NotificationTranslations.EN]: "Item not found.",
        [NotificationTranslations.ES]: "Elemento no encontrado.",
      },
      type: NotificationType.ERROR,
    },
    [NotificationId.SERVER_ERROR]: {
      id: NotificationId.SERVER_ERROR,
      message: {
        [NotificationTranslations.EN]: "Server error.",
        [NotificationTranslations.ES]: "Error del servidor.",
      },
      type: NotificationType.ERROR,
    },
    [NotificationId.INVALID_DATA_FROM_API]: {
      id: NotificationId.INVALID_DATA_FROM_API,
      message: {
        [NotificationTranslations.EN]: "Error getting data from your Company.",
        [NotificationTranslations.ES]:
          "No pudios obtener los datos de tu Empresa.",
      },
      type: NotificationType.ERROR,
    },
    [NotificationId.DELETE_ORGANIZATION_SUCCESS]: {
      id: NotificationId.DELETE_ORGANIZATION_SUCCESS,
      message: {
        [NotificationTranslations.EN]: "Organization deleted successfully.",
        [NotificationTranslations.ES]: "Organización eliminada exitosamente.",
      },
      type: NotificationType.SUCCESS,
    },
    [NotificationId.UPDATE_ORGANIZATION_SUCCESS]: {
      id: NotificationId.UPDATE_ORGANIZATION_SUCCESS,
      message: {
        [NotificationTranslations.EN]: "Organization updated successfully.",
        [NotificationTranslations.ES]: "Organización actualizada exitosamente.",
      },
      type: NotificationType.SUCCESS,
    },
    [NotificationId.INTERNET_CONNECTION_ERROR]: {
      id: NotificationId.INTERNET_CONNECTION_ERROR,
      message: {
        [NotificationTranslations.EN]:
          "Internet connection error. Please check your connection.",
        [NotificationTranslations.ES]:
          "Error de conexión a Internet. Por favor, verifique su conexión.",
      },
      type: NotificationType.ERROR,
    },
    [NotificationId.INTERNET_CONNECTION_SUCCESS]: {
      id: NotificationId.INTERNET_CONNECTION_SUCCESS,
      message: {
        [NotificationTranslations.EN]: "Internet connection successful.",
        [NotificationTranslations.ES]: "Conexión a Internet exitosa.",
      },
      type: NotificationType.SUCCESS,
    },
    [NotificationId.SUBSCRIPTION_SUCCESS]: {
      id: NotificationId.SUBSCRIPTION_SUCCESS,
      message: {
        [NotificationTranslations.EN]: "Subscription successful.",
        [NotificationTranslations.ES]: "Suscripción exitosa.",
      },
      type: NotificationType.SUCCESS,
    },
    [NotificationId.SUBSCRIPTION_ERROR]: {
      id: NotificationId.SUBSCRIPTION_ERROR,
      message: {
        [NotificationTranslations.EN]: "Subscription error.",
        [NotificationTranslations.ES]: "Error de suscripción.",
      },
      type: NotificationType.ERROR,
    },
    [NotificationId.SUBSCRIPTION_ALREADY_EXISTS]: {
      id: NotificationId.SUBSCRIPTION_ALREADY_EXISTS,
      message: {
        [NotificationTranslations.EN]: "Subscription already exists.",
        [NotificationTranslations.ES]: "La suscripción ya existe.",
      },
      type: NotificationType.ERROR,
    },
  };
