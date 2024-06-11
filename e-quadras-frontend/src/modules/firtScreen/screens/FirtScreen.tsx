import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuthorizationToken } from '../../../shared/functions/connection/auth';

const FirtScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthorizationToken();

    if (token) {
      navigate('/sports-court');
    } else {
      navigate('/login');
    }
  }, []);

  return <div>firtScreen</div>;
};

export default FirtScreen;
