import { Bounce, Slide, ToastOptions, ToastPosition } from "react-toastify";

export const toastDefaultOptions: ToastOptions = {
  position: "top-right" as ToastPosition,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};
