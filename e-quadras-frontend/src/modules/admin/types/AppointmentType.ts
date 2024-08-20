import { SportsCourtType } from '../../../shared/types/SportsCourtType';
import { CustomerType } from './CustomerType';

export interface AppointmentType {
  id: number;
  dateTimeSchedule: Date;
  customer: CustomerType;
  sportsCourt: SportsCourtType;
}
