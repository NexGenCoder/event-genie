export type CreateEventBody = {
   userId: string
   eventName: string
   startDateTime: Date
   endDateTime: Date
   description: string
   location: string
   eventType: string
   eventLogo?: string
}
