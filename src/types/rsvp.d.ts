export type IRsvp = {
   rsvpId: string
   userId: string
   eventId: string
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
