import { useState } from 'react';

import { connectionAPIPost } from '../functions/connection/connectionAPI';

function useRequest() {
  const [loading, setLoading] = useState(false);

  const getRequest = async (url: string) => {
    setLoading(true);

    return await fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
    setLoading(true);

    const returnData = await connectionAPIPost<T>(url, body)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log('Senha inválida');
        console.error(error);
        return undefined;
      });

    setLoading(false);
    return returnData;
  };

  return {
    loading,
    getRequest,
    postRequest,
  };
}

export default useRequest;
