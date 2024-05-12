# Database Schema

## User Table

- `userId`: (Optional) number
- `username`: (Optional) string
- `firstName`: (Optional) string
- `lastName`: (Optional) string
- `email`: (Optional) string
- `googleId`: (Optional) string
- `role`: (Optional) "Organizer" | "Vendor" | "Guest"
- `subscription`: (Optional) "Free" | "Basic" | "Premium"
- `profilePicture`: (Optional) string
- `bio`: (Optional) string
- `createdAt`: (Optional) Date
- `updatedAt`: (Optional) Date
- `mobile`: (Optional) string
- `isMobileVerified`: (Optional) boolean
- `isEmailVerified`: (Optional) boolean
- `isProfileCompleted`: boolean
- `isAccountDeleted`: (Optional) boolean
- `isAccountSuspended`: (Optional) boolean

## Venue Table

- `venueID`: (Optional) number
- `venueName`: string
- `location`: string
- `capacity`: number
- `description`: (Optional) string
- `type`: "Indoor" | "Outdoor"
- `createdAt`: (Optional) Date
- `updatedAt`: (Optional) Date
- `perHour`: number
- `perDay`: number
- `perWeek`: number
- `perMonth`: number
  - `perPerson`: number

## Event Table

- `eventID`: (Optional) number
- `eventName`: string
- `organizerID`: number (Foreign key reference to User.UserID)
- `startDateTime`: Date
- `endDateTime`: Date
- `venueID`: (Optional) number | null (Nullable foreign key reference to Venue.VenueID)
- `description`: (Optional) string
- `createdAt`: (Optional) Date
- `updatedAt`: (Optional) Date

## RVSP Table

- `rsvpID`: (Optional) number
- `eventID`: number (Foreign key reference to Event.EventID)
- `userId`: number (Foreign key reference to User.UserID)
- `role`: "Organizer" | "Vendor" | "Guest"
- `rsvpStatus`: "Accepted" | "Declined" | "Pending" (Optional)
- `createdAt`: (Optional) Date
- `updatedAt`: (Optional) Date

## EventParticipant Table

- `participantID`: (Optional) number
- `eventID`: number
- `userId`: number
- `rvspID`: number
- `role`: "Organizer" | "Vendor" | "Guest"
- `rsvpStatus`: "Accepted" | "Declined" | "Pending" (Optional)
- `createdAt`: (Optional) Date
- `updatedAt`: (Optional) Date

## VendorService Table

- `serviceID`: (Optional) number
- `vendorID`: number
- `serviceType`: string (Catering, Photography, Decoration, etc.)
- `description`: (Optional) string
- `createdAt`: (Optional) Date
- `updatedAt`: (Optional) Date

## ChatMessage Table

- `messageID`: (Optional) number
- `senderID`: number (Foreign key reference to User.UserID)
- `receiverID`: number (Foreign key reference to User.UserID or channel.channelID)
- `type`: "Direct" | "Channel"
- `message`: string
- `timestamp`: Date
- `createdAt`: (Optional) Date
- `updatedAt`: (Optional) Date

## ChannelParticipant Table

- `participantID`: (Optional) number
- `channelID`: number (Foreign key reference to channel.channelID)
- `userId`: number (Foreign key reference to User.UserID)
- `joinedAt`: (Optional) Date
- `lastSeen`: (Optional) Date
- `createdAt`: (Optional) Date
- `updatedAt`: (Optional) Date

## Channel Table

- `channelID`: (Optional) number
- `channelName`: string
- `description`: (Optional) string
- `participants`: array of channelParticipant objects
- `type`: "Public" | "Private" | "Archived" | "Deleted"
- `createdAt`: (Optional) Date
- `updatedAt`: (Optional) Date

## ChannelGroup Table

- `groupID`: (Optional) number
- `groupName`: string
- `description`: (Optional) string
- `channels`: array of channel objects
- `createdAt`: (Optional) Date
- `updatedAt`: (Optional) Date
- `createdBy`: number (Foreign key reference to User.UserID)
- `isGroupDeleted`: (Optional) boolean
- `isGroupArchived`: (Optional) boolean
