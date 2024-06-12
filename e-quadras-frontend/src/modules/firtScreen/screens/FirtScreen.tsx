import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USER } from '../../../shared/constants/urls';
import {
  getAuthorizationToken,
  unsetAuthorizationToken,
} from '../../../shared/functions/connection/auth';
import { connectionAPIGet } from '../../../shared/functions/connection/connectionAPI';

const FirtScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = getAuthorizationToken();

      if (token) {
        await connectionAPIGet(URL_USER)
          .then(() => {
            navigate('/sports-court');
          })
          .catch(() => {
            unsetAuthorizationToken();
            navigate('/login');
          });
      } else {
        navigate('/login');
      }
    };
    verifyToken();
  }, []);

  return <div>Carregando...</div>;
};

export default FirtScreen;
