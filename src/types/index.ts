
export type CalendarEventType = {
  id: string
  index: number
  name: string
  type: string
  starts_at: string
  ends_at: string
  
  email: string
  address: string
  description?: string
  approved?: boolean
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
  approved: boolean
}

export interface CalendarRow {
  id: string
  timestamp: string
  name: string
  type: string
  location: string
  website: string

  
  starts_at: string
  ends_at: string
  phone: string
  email: string
  description: string
}


