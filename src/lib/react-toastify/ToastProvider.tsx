"use client";

import "react-toastify/dist/ReactToastify.css";
import "../../app/globals.css";
import { ToastContainer } from "react-toastify";
import { toastDefaultOptions } from "@/src/utils/utils/toastify/toastDefaultOptions";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer {...toastDefaultOptions} />
    </>
  );
}
