# GigFlow

GigFlow is a mini-freelance marketplace platform where clients can post jobs (Gigs) and freelancers can apply for them (Bids).

## Features
- **User Authentication**: Secure Sign-up and Login using JWT and HttpOnly cookies.
- **Roles**: Fluid roles (any user can post or bid).
- **Gig Management**:
  - Browse Open Gigs.
  - Search Gigs by title.
  - Post new Gigs.
- **Hiring Logic**:
  - Clients can review bids.
  - "Hire" button atomic action.
  - Automatically marks chosen bid as "hired" and rejects others.

## Bonus Features
1. **Transactional Integrity**: Uses MongoDB Transactions to ensure the Hiring logic is race-condition proof.
2. **Real-time Updates**: Integrated Socket.io to notify freelancers instantly when they are hired.

## Tech Stack
- **Frontend**: React.js (Vite) + Tailwind CSS + Redux Toolkit
- **Backend**: Node.js + Express.js + local MongoDB
- **Real-time**: Socket.io

## Setup

### Backend
1. Go to `gigflow-backend` directory.
2. Install dependencies: `npm install`
3. Rename `.env.example` to `.env` and configure your Mongo URI.
4. Run: `npm run dev`

### Frontend
1. Go to `gigflow-frontend` directory.
2. Install dependencies: `npm install`
3. Rename `.env.example` to `.env`.
4. Run: `npm run dev`

## Requirements Covered
- [x] Secure Auth (HttpOnly)
- [x] Gig CRUD
- [x] Search/Filter
- [x] Hiring Logic
- [x] Bonus 1: Transactions
- [x] Bonus 2: Real-time Notifications (Toast)
"# GigFlow" 
