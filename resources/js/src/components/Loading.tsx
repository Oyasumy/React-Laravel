import { Modal, Spin } from 'antd';

import { useRedux } from '@hooks';
import { selectLoading } from '@reducer/reducer/app';

const LoadingModal = () => {
  const { dispatch, select } = useRedux();
  const isLoading = select(selectLoading);

  return (
    <Modal className='loadingModal' closeIcon={false} footer={null} style={{ zIndex: 1002, maxWidth: 'max-content' }} centered open={isLoading}>
      <Spin size='large' />
    </Modal>
  );
};
export default LoadingModal;
