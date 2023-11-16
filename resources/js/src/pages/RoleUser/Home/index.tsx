import { Typography } from 'antd';
import { Link } from 'react-router-dom';

import { PAGE_URL } from '@constants';
import { useNavigation, useToast } from '@hooks';

const { Title } = Typography;
const Home = () => {
  useNavigation();

  const { toast, toastError, toastSuccess } = useToast();

  const onToast = () => {
    toastSuccess('Event has been created');
  };
  return (
    <div>
      <Title>Home User</Title>
      <Link to={PAGE_URL.USER.POST}>go to Post</Link>

      <button onClick={() => onToast()}>Give me a toast</button>
    </div>
  );
};

export default Home;
