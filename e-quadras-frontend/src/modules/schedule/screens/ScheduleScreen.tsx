import { format } from 'date-fns';
import { useState } from 'react';

import Calendar from '../components/Calendar';
import DaySchedules from '../components/DaySchedules';

const ScheduleScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSetTodayButton = () => setCurrentDate(new Date());

  return (
    <div className="mt-16 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <p>Selected Date: {format(currentDate, 'dd LLLL yyyy')}</p>
        <button
          onClick={handleSetTodayButton}
          className="text-sm px-4 py-1 rounded text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        >
          Today
        </button>
      </div>
      <Calendar value={currentDate} onChange={setCurrentDate} />
      <DaySchedules />
    </div>
  );
};

export default ScheduleScreen;
