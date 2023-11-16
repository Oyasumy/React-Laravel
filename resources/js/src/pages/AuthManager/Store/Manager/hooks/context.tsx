import { UploadFile } from 'antd';
import { createContext, useContext, useState } from 'react';

/**
 * Context
 */
type UploadContext = {
  fileList: UploadFile<any>[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
};
const UploadFilesContext = createContext<any>([]);

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  return <UploadFilesContext.Provider value={{ fileList, setFileList }}>{children}</UploadFilesContext.Provider>;
};

export const useUploadContext = () => {
  const { fileList, setFileList } = useContext<UploadContext>(UploadFilesContext);

  return {fileList, setFileList};
};
