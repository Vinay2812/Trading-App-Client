import { type Toast, toast } from "react-hot-toast";

type ToastType =
  | Partial<
      Pick<
        Toast,
        | "id"
        | "icon"
        | "duration"
        | "ariaProps"
        | "className"
        | "style"
        | "position"
        | "iconTheme"
      >
    >
  | undefined;

export const useCustomToast = () => {
  const options: ToastType = {
    duration: 2000,
    id: "toast"
  };
  const toasts = {
    success: (message: string) => {
      toast.success(message, options);
    },
    fail: (message: string) => {
      toast.error(message, options);
    },
  };
  return toasts;
};
