import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

const SportsCourtScreen = () => {
  const { user } = useGlobalReducer();

  return <div>{`SportsCourt ${user?.name}`}</div>;
};

export default SportsCourtScreen;
