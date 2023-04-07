import { DayOfWeek } from '~/enums/day-of-week';
import { Dayjs } from 'dayjs';

export type DoctorAvailability = {
  day_of_week: DayOfWeek;
  start_time: Dayjs;
  end_time: Dayjs;
};
