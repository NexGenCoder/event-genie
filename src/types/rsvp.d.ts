export type IRsvp = {
   rsvpid: string
   userid: string
   eventid: string
   status: 'accepted' | 'declined' | 'pending'
   expiry_at: Date
   created_at: Date
   updated_at: Date
   is_open_invite: boolean
   user_limit?: number
   claimed_by?: string[]
}

export type ICreatersvp = {
   userid?: string
   eventid: string
   expiry_at: Date
   user_limit?: number // Only for open invites
}

export type IUpdateRsvp = {
   rsvpid: string
   status: 'accepted' | 'declined'
   userid?: string // Only for open invites
}

export type IGetUserRsvp = {
   message: string
   data: [
      {
         rsvpid: string
         userid: string
         event: {
            eventid: string
            parent_eventid: string | null
            event_name: string
            start_date_time: string
            end_date_time: string
            description: string
            event_logo: string
            location: string
            event_type: string
            created_at: string
            updated_at: string
            userid: string
         }
         status: 'accepted' | 'declined' | 'pending'
         expiry_at: Date
         created_at: Date
         updated_at: Date
         is_open_invite: boolean
         user_limit?: number
         claimed_by?: string[]
      },
   ]
}
