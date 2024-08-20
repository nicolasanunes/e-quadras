import { useState } from 'react';

import { AuthType } from '../../modules/login/types/AuthType';
import { useGlobalReducer } from '../../state/store/reducers/globalReducer/useGlobalReducer';
import { URL_AUTH } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import { connectionAPIGet, connectionAPIPost } from '../functions/connection/connectionAPI';

function useRequest() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useGlobalReducer();

  const getRequest = async <T>(url: string): Promise<T | undefined> => {
    setLoading(true);

    const returnData = await connectionAPIGet<T>(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });

    setLoading(false);
    return returnData;
  };

  const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
    setLoading(true);

    const returnData = await connectionAPIPost<T>(url, body)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });

    setLoading(false);
    return returnData;
  };

  const authRequest = async (body: unknown): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        window.location.href = '/admin';
        return result;
      })
      .catch(() => {
        console.log('Usuário ou senha inválidos.');
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    getRequest,
    postRequest,
    authRequest,
  };
}

export default useRequest;
