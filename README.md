# EV-NOTIFS

### Version: 2.1.0

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:3000
```

### MEAN STACK
- Frontend - Angular
- Backend  - Node.js + Express + MongoDB

### TOOLS
- [Node Passport Login](https://github.com/bradtraversy/node_passport_login)
- [NodeMailer](https://nodemailer.com/about/) for Email notifications

## TASKS
- Frontend -> Backend Requests
- Make QR Codes

## PROBLEMS AND SOLUTIONS

- HICCUPS
  - A current session is considered over once it stops and no new session begins within the next 2 minutes.

  - If A's session stops and and another session begins in less than 2 minutes, it is possibly just A having a hiccup (or a swap, that we don't account for).
    - If the the new session is less than 15 minutes, then it was just A having a hiccup. 
    - Else, if it was more than 15 minutes, then it is a new session. If there is a C car, then the new session is assumed to be C's.
   
   - If A's session stops and another session begins in more than 2 minutes, it is a new session. If there is a C car, then the new session is assumed to be C's.

## User Stories

**User Story 1: First 22 Spots ('A/B' spots)**

1. User parks car at a an empty spot at charger port EV #X.
2. User plugs a free charger into car.
3. User scans QR code on the pole of the charger they plugged in - they are redirected to the app.
4. Login/Registration
    - If it is their first time using the app, user registers to create a profile.
    - Else, user logs in with their credentials - browser can remember these. 
5. User's work is done - the app now registered User as being plugged in at EV #X.
6. User will get a notification once their car has finished charging.

**User Story 2: Next 11 Spots ('C' spots)**

1. User parks car at the waiting spot at charger port EV #X. Both other spots are occupied by charging cars.
2. User scans the _waiting_ QR code on the pole of the charger they plugged in - they are redirected to the app.
3. Login/Registration
    - If it is their first time using the app, user registers to create a profile.
    - Else, user logs in with their credentials - browser can remember these. 
4. User's work is done - the app now registered User as waiting for a charger at EV #X, and they will get notified once a charger becomes available.

**User Story 3: Everyone Else (General Waiting Queue)**

1. User parks car at general lot and scans QR code at the door - they are redirected to the app.
2. App presents a pop-up stating that all 33 EV spots are taken, and adds User to a general waiting queue.
3. When the spots become available after _both A/B and C users have been served_, the app will run down the general waiting queue to notify users. Users will be removed from the queue once notified.

## Unique Situations to Address
- Hiccup Sessions
- Good Samaritans
- Users Plugging in Friends

## Possible Future Features
- Collect Session + Registration Data for Analytics, Predictions, AI/ML
- Slack Integration
- Computer Vision Detecting Cars with Cameras
