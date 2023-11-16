import { Modal } from 'antd';

type TModal = {
  title: string;
  content: string;
  onCancel?: () => void;
  onOK?: () => void;
  width?: number;
};

export const useModalConfirm = () => {
  const confirm = ({ title, content, onCancel, onOK }: TModal) => {
    Modal.confirm({
      title: title,
      // icon: <ExclamationCircleOutlined />,
      content: content,
      okText: 'はい',
      cancelText: 'キャンセル',
      onCancel: onCancel,
      onOk: onOK,
    });
  };

  const success = ({ title, content, onCancel, onOK }: TModal) => {
    Modal.success({
      title: title,
      // icon: <ExclamationCircleOutlined />,
      content: content,
      okText: 'はい',
      cancelText: 'キャンセル',
      onCancel: onCancel,
      onOk: onOK,
    });
  };

  const error = ({ title, content, onCancel, onOK, width }: TModal) => {
    Modal.error({
      title: title,
      // icon: <ExclamationCircleOutlined />,
      content: content,
      okText: 'はい',
      cancelText: 'キャンセル',
      onCancel: onCancel,
      onOk: onOK,
      width: width,
    });
  };

  const warning = ({ title, content, onCancel, onOK }: TModal) => {
    Modal.warning({
      title: title,
      // icon: <ExclamationCircleOutlined />,
      content: content,
      okText: 'はい',
      cancelText: 'キャンセル',
      onCancel: onCancel,
      onOk: onOK,
    });
  };

  return { confirm, success, error, warning };
};
