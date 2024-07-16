import { useEffect, useState } from 'react';

import { URL_SPORTS_COURT } from '../../../shared/constants/urls';
import useRequest from '../../../shared/hooks/useRequest';
import CreateSportsCourtModal from './CreateSportsCourtModal';

interface DataType {
  id: number;
  name: string;
}

const SportsCourtList = () => {
  const [data, setData] = useState<DataType[]>([] as DataType[]);
  const { getRequest } = useRequest();

  useEffect(() => {
    getRequest(URL_SPORTS_COURT).then((data) => setData(() => data as DataType[]));
  }, []);

  return (
    <div className="">
      <ul>
        {data.map((sportsCourt) => (
          <li key={sportsCourt.id}>{sportsCourt.name}</li>
        ))}
      </ul>
      <div className="">
        <CreateSportsCourtModal />
      </div>
    </div>
  );
};

export default SportsCourtList;
