import { UploadProvider } from '@pages/AuthManager/Store/Manager/hooks/context';

/**
 * Import Contexts To use it in Global
 */
export const ContextsProvider = ({ children }: { children: React.ReactNode }) => {
  return <UploadProvider>{children}</UploadProvider>;
};
