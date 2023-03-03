export type CalendarEventType = {
  id: string
  index: number
  name: string
  type: string
  start_date: string
  start_time: string
  end_date: string
  end_time: string
  email: string
  location: string
  description?: string
  approved?: string
}

export type CalendarEventsType = CalendarEventType[]

export type CalendarPageType = {
  calendarData: CalendarEventType[]
}

export interface DirectoryRow {
  timestamp: string,
  name: string,
  category: string
  address: string
  email: string
  website: string
  phone: string
  description: string
}

export interface CalendarRow {
  id: string
  timestamp: string
  name: string
  type: string
  location: string
  website: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  phone: string
  email: string
  description: string
}
