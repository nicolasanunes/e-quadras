import type { CustomerInterface } from './customer.interface'
import type { SportsCourtInterface } from './sportsCourt.interface'

export interface ScheduleAppointmentInterface {
  id: number
  dateTimeSchedule: Date
  createdAt: Date
  customer: CustomerInterface
  sportsCourt: SportsCourtInterface
}
