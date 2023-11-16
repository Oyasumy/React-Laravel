import { ExternalToast, toast as toaster } from 'sonner';

// TOAST
export type TToast = (title: string, description?: string, options?: ExternalToast) => void;

export const useToast = () => {
  const toast: TToast = (title, description, options) => {
    toaster(title, {
      description: description,
      ...options,
    });
  };
  const toastSuccess: TToast = (title, description, options) => {
    toaster.success(title, {
      description: description,
      ...options,
    });
  };
  const toastError: TToast = (title, description, options) => {
    toaster.error(title, {
      description: description,
      ...options,
    });
  };

  return { toast, toastSuccess, toastError };
};
