import { NavigateOptions, To, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { URL_TYPE, UrlType } from '@constants';

export const useNavigation = () => {
  // Hook
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const typeUrl = getTypeUrl();

  //   Goto Page
  const gotoPage: (to: To, options?: NavigateOptions | undefined) => void = (page, option) => {
    navigate(page, option);
  };

  const goBack = () => navigate(-1);
  
  function getTypeUrl(): UrlType {
    const pathName = location.pathname;

    if (pathName.includes(URL_TYPE.EDIT)) return URL_TYPE.EDIT;
    if (pathName.includes(URL_TYPE.DETAIL)) return URL_TYPE.DETAIL;
    if (pathName.includes(URL_TYPE.ADD)) return URL_TYPE.ADD;

    return URL_TYPE.ADD;
  }

  //   console.log({ params, location });

  return { gotoPage, goBack, params, location, searchParams, setSearchParams, typeUrl };
};
