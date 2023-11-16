import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from 'antd';

import { URL_TYPE } from '@constants';

// Returns a memoized version of the screen.
export const getScreenDevice = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const memoScreen = useMemo(() => screens, [screens]);

  return memoScreen;
};

// NAVIGATION
// Returns the type URL.
export const getTypeUrl = (id: string | undefined) => {
  if (!id) return URL_TYPE.ADD;

  const location = useLocation();

  return id ? (location.pathname.includes(URL_TYPE.EDIT) ? URL_TYPE.EDIT : URL_TYPE.DETAIL) : URL_TYPE.ADD;
};
