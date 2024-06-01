## This document contains list of all the APIs

### Authentication

-  /auth/send-otp (POST)
   -  Sends OTP to mobile no passed
   -  Returns 200 on sucessful response
-  /auth/verify-otp (POST)
   -  Verifies the OTP entered by user
   -  Returns 401 in case of mismatch / expired OTP
   -  Returns 404 if OTP is not found
   -  Returns 200 in case of sucess
-  /auth/add-user-details (POST)
   -  Updates user details
   -  Returns 200 in case of sucessful response
-  /auth/self (GET)
   -  Gets the data of the user from the token
   -  Returns 404 if the user is not found
-  /auth/logout (GET)
   -  Logouts a user
   -  Returns 401 if the Session is not found for the user
   -  If the cookie is found it clears it and redirects to home page
-  /auth/google (GET)
   -  Authenticate user with Google login
-  /auth/google/callback (GET)
   -  Callback made by google for completing authentication

### Channel

-  /channel/:channelId (GET)
   -  Gets channel details based on channel id
   -  returns 200 on sucess
   -  returns 404 if channel is not found

### Events

-  /event/types (GET)
   -  Fetches all event types
   -  Returns 200 in case of sucess
-  /event (POST)
   -  Creates an event
   -  Returns 201 in case of sucessful event creation
-  /events (GET)
   -  Fetches the events for the userId
   -  Returns 200 on sucessful response
-  /event/channels/:eventId (GET)
   -  Gets channel categories by event id
-  /event/:eventId (GET)
   -  Gets event details based on event Id
-  /event/categories/:eventId (GET)
   -  Gets categories by event id
   -  returns 404 if not categories found
-  /event/category (POST)
   -  Creates a category for the eventId
   -  Takes eventId, name, description
   -  Returns 201 on sucess
-  /event/channel (POST)
   -  Creates a channel for the event
   -  Returns 201 on sucess

### Messages

-  /channels/:channelid/messages (POST)
   -  Sends a message to specified channel
   -  Returns 200 on sucessful message
-  /channels/:channelid/messages (GET)
   -  Gets messages by channelId
   -  Returns 200 if sucess
   -  Returns 500 incase of failure

### Users

-  /user/exists/:username
   -  Checks if the username is available for registration
   -  Returns 200 and status if the username is taken or not already
   -  Returns 500 incase of error
-  /users/
   -  Gets all the users
   -  Returns message 'Total users found:' on sucessfully able to find users
   -  Returns 500 in case of error

### RSVPs

-  /rsvp/direct (POST)
   -  Creates a direct invite RSVP for the userid
   -  Returns 400 if the RSVP already exists
   -  Returns 500 incase of internal error
   -  Returns 201 on sucessful creation
-  /rsvp/open (POST)
   -  Creates an open link for anyone to join, we can have a user limit and expiry defined.
   -  Returns 201 on sucessful creation
-  /rsvp/direct (PUT)
   -  Updates the direct RSVP
   -  Takes the input as rsvpId and status
   -  Returns 200 on sucessful update
-  /rsvp/open (PUT)
   -  Updates on open RSVP invite
   -  Takes the rsvpid and status
   -  Returns 200 on sucessful update
-  /rsvp/user (GET)
   -  Gets the rsvps by user
   -  Returns 400 in case of invalid userid
   -  Returns 404 if no RSVPs are found
   -  Returns 200 in case of sucessfully finding the RSVPs
-  /rsvp/event/:eventId (GET)
   -  Gets all the RSVPs for the eventid
   -  Returns 200 if its able to fetch the RSVPs
   -  Returns 404 if no RSVPs are found
   -  Returns 500 if there is some error
