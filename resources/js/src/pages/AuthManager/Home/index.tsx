import { useNavigation } from '@hooks';
import { Typography } from 'antd';

const { Title } = Typography;
const Home = () => {
  useNavigation();

  return (
    <div>
      <Title>Home Admin</Title>
    </div>
  );
};

export default Home;
