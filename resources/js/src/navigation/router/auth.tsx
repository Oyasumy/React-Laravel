import { ROLE_ACCESS, RoleAccess } from '@constants';
import { useRedux } from '@hooks';
import { selectUser } from '@reducer/reducer/user';
import { Routes } from 'react-router-dom';

type TElement = {
  role: RoleAccess | RoleAccess[];
  routes: React.ReactElement;
};
const AuthRoute = ({ elements }: { elements: TElement[] }) => {
  const { select } = useRedux();

  const roleUser = select(selectUser);

  console.log('role user', roleUser);

  const els = elements?.filter((m: TElement) => m.role?.includes(roleUser?.role)) ?? null;
  const Router = els.map((el) => el.routes);

  if (Router) return Router;

  return <Routes>{elements?.find((m: TElement) => m.role === ROLE_ACCESS.NONE)?.routes ?? null}</Routes>;
};

export default AuthRoute;
