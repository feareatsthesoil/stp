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
  pronouns: string,
  id?: number,
  timestamp: string,
  name: string,
  category: string
  address: string
  email: string
  website: string
  phone: string
  twitter: string
  instagram: string
  description: string
  approved: boolean
  profile?: boolean

  userId: string
}

export interface CalendarRow {
  id: string
  timestamp: string
  name: string
  type: string
  address: string
  website: string


  starts_at: string
  ends_at: string
  phone: string
  email: string
  description: string
}


