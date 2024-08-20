import { useEffect, useState } from 'react';

import { URL_SCHEDULE_APPOINTMENT } from '../../../shared/constants/urls';
import useRequest from '../../../shared/hooks/useRequest';
import { AppointmentType } from '../types/AppointmentType';

const Appointment = () => {
  const [data, setData] = useState<AppointmentType[]>([] as AppointmentType[]);
  const { getRequest } = useRequest();

  useEffect(() => {
    getRequest(URL_SCHEDULE_APPOINTMENT).then((data) => setData(() => data as AppointmentType[]));
  }, []);

  return (
    <main className="flex flex-col w-screen">
      <ul>
        {data.map((schedule) => (
          <li key={schedule.id}>
            <div className="relative flex my-1 mx-1 px-3 py-1 border border-gray-50 bg-gray-800 opacity-100 hover:text-gray-100 hover:opacity-85">
              <div className="">
                <p className="font-normal text-gray-100">Quadra: {schedule.sportsCourt.name}</p>
                <p className="font-normal text-gray-100">Nome: {schedule.customer.name}</p>
                <p className="font-normal text-gray-100">Telefone: {schedule.customer.phone}</p>
                <p className="font-normal text-gray-100">
                  Horário:{' '}
                  {new Date(schedule.dateTimeSchedule).toLocaleString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                  })}
                </p>
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
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Appointment;
