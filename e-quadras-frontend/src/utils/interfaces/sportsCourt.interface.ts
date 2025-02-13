import type { DaysOfWeekInterface } from './daysOfWeek.interface'
import type { LocationInterface } from './location.interface'
import type { TimesOfDayInterface } from './timesOfDay.interface'

export interface SportsCourtInterface {
  id: number
  name: string
  modality: string
  price: number
  location: LocationInterface
  daysOfWeek: DaysOfWeekInterface[]
  timesOfDay: TimesOfDayInterface[]
}
