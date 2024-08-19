import { useEffect, useState } from 'react';

import { URL_SCHEDULE_APPOINTMENT } from '../../../shared/constants/urls';
import useRequest from '../../../shared/hooks/useRequest';

interface SportsCourtType {
  name: string;
}

interface CustomerType {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface DataType {
  id: number;
  dateTimeSchedule: Date;
  customer: CustomerType;
  sportsCourt: SportsCourtType;
}

const Scheduling = () => {
  const [data, setData] = useState<DataType[]>([] as DataType[]);
  const { getRequest } = useRequest();

  useEffect(() => {
    getRequest(URL_SCHEDULE_APPOINTMENT).then((data) => setData(() => data as DataType[]));
  }, []);

  return (
    <main className="flex flex-col h-screen w-screen mt-2">
      <ul>
        {data.map((schedule) => (
          <li key={schedule.id}>
            <div className="rounded-2xl border-2 border-solid border-black p-4 my-1 mx-12">
              Id do agendamento: {schedule.id}
              Dados do cliente: {schedule.customer.name}
              Dados da quadra: {schedule.sportsCourt.name}
              Horário escolhido: {new Date(schedule.dateTimeSchedule).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Scheduling;
