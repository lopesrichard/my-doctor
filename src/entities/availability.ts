import { DayOfWeek } from '~/enums/day-of-week';
import { Dayjs } from 'dayjs';

export type Availability = {
  dayOfWeek: DayOfWeek;
  startTime: Dayjs;
  endTime: Dayjs;
};
