import { useDispatch } from 'react-redux';

import { UserType } from '../../../modules/login/types/UserType';
import { useAppSelector } from '../../hooks';
import { setUserAction } from '.';

export const useGlobalReducer = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.globalReducer);

  const setUser = (user: UserType) => {
    dispatch(setUserAction(user));
  };

  return {
    user,
    setUser,
  };
};
