import { DayOfWeek } from '~/enums/day-of-week';

export type DoctorAvailability = {
  day_of_week: DayOfWeek;
  start_time: Date;
  end_time: Date;
};
