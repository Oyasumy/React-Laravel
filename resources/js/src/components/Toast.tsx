import { Toaster } from 'sonner';

const ToastComponent = () => {
  return (
    <div style={{ position: 'absolute' }}>
      <Toaster richColors closeButton position='top-right' />
    </div>
  );
};

export default ToastComponent;
