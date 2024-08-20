import { useEffect, useState } from 'react';

import { URL_SPORTS_COURT } from '../../../shared/constants/urls';
import useRequest from '../../../shared/hooks/useRequest';
import { SportsCourtType } from '../../../shared/types/SportsCourtType';

const SportsCourt = () => {
  const [data, setData] = useState<SportsCourtType[]>([] as SportsCourtType[]);
  const { getRequest } = useRequest();

  useEffect(() => {
    getRequest(URL_SPORTS_COURT).then((data) => setData(() => data as SportsCourtType[]));
  }, []);

  return (
    <main className="flex flex-col w-screen">
      <ul>
        {data.map((sportsCourt) => (
          <li key={sportsCourt.id}>
            <div className="relative flex my-1 mx-1 px-3 py-1 border border-gray-50 bg-gray-800 opacity-100 hover:text-gray-100 hover:opacity-85">
              <div className="">
                <p className="font-normal text-gray-100">Quadra: {sportsCourt.name}</p>
                <p className="font-normal text-gray-100">Modalide: {sportsCourt.modality}</p>
                <p className="font-normal text-gray-100">Preço: {sportsCourt.price}</p>
              </div>
              <i className="absolute right-2 top-1 cursor-pointer" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </i>
              <i className="absolute right-2 bottom-2 cursor-pointer" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </i>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default SportsCourt;
