import { AppDispatch, RootState } from '@reducer/configStore';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useRedux = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const selector: TypedUseSelectorHook<RootState> = useSelector;

  const select = (action: any) => {
    return selector((state: RootState) => action(state));
  };
  const dispatch = useAppDispatch();
  return { dispatch, select };
};
