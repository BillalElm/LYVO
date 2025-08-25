# LYVO Web2 MVP

This repository contains a minimal, working implementation of the **LYVO** marketplace MVP (Web2 only, no crypto).  
It includes a React Native front‑end (built with Expo), a Node.js/Express API with a PostgreSQL database (using Prisma), and Stripe integration for payments.  
Use this project as a starting point to test the core booking flow: a client can request a home service, a provider can accept it, payment can be processed, and the booking status is updated accordingly.

## Project structure

```
lyvo-mvp/
├─ app/                    # Mobile front‑end (Expo React Native)
│  ├─ src/
│  │  ├─ assets/          # Icons, images, splash
│  │  ├─ components/      # Reusable UI components (empty, ready to extend)
│  │  ├─ navigation/      # React Navigation configuration
│  │  ├─ screens/         # App screens
│  │  │  ├─ Auth/         # Welcome & SignIn
│  │  │  ├─ Client/       # Client‑facing screens (Home, Form, Checkout, Booking)
│  │  │  └─ Pro/          # Pro‑facing screens (future)
│  │  ├─ services/        # Axios API wrapper
│  │  └─ theme/           # Color palette & spacing helpers
│  ├─ package.json        # Front dependencies and scripts
│  └─ app.json            # Expo configuration
│
├─ server/                 # Back‑end API (Express + Prisma)
│  ├─ prisma/
│  │  ├─ schema.prisma    # Prisma schema defining DB models
│  │  └─ seed.ts          # Seed script for base services
│  ├─ src/
│  │  ├─ index.ts         # API entrypoint
│  │  ├─ routes/          # Express routers
│  │  │  ├─ services.ts   # Read services
│  │  │  ├─ bookings.ts   # Create/read/update bookings
│  │  │  └─ payments.ts   # Stripe payment intents
│  │  └─ controllers/     # (not used yet; ready for extension)
│  ├─ package.json        # API dependencies and scripts
│  └─ tsconfig.json       # TypeScript configuration
│
├─ infra/
│  └─ docker-compose.yml   # PostgreSQL + pgAdmin for local development
└─ .env.example
```

The `.env.example` file contains the environment variables required for both the front and back.  
Copy it to `.env` at the repository root and fill in your keys before running the project.

## Getting started

1. **Install dependencies**

   This project assumes you have Node.js (>= 18) installed.  If you plan to run the mobile app, install Expo CLI globally:

   ```sh
   npm install -g expo-cli
   ```

   Then install dependencies for both front and back:

   ```sh
   cd lyvo-mvp/server
   npm install
   cd ../app
   npm install
   ```

2. **Set up the database**

   Launch the PostgreSQL service via Docker:

   ```sh
   cd lyvo-mvp/infra
   docker compose up -d
   ```

   Apply Prisma migrations and seed the database:

   ```sh
   cd ../server
   npx prisma migrate dev --name init
   npx ts-node prisma/seed.ts
   ```

3. **Run the back‑end API**

   From the `server` directory:

   ```sh
   npm run dev
   ```

   The API will start on `http://localhost:4000`.  You can test the health route at `http://localhost:4000/health`.

4. **Run the mobile app**

   From the `app` directory:

   ```sh
   npm start
   ```

   This will launch the Expo development server.  You can run the app in a simulator or on a device via the Expo Go app.  The mobile app expects the API to be running at `EXPO_PUBLIC_API_URL` defined in `.env`.

## Notes

* This MVP uses dummy client/pro users when creating and accepting bookings.  Proper authentication and authorization via Firebase are left as an exercise.
* The payment step creates a Stripe payment intent via the back‑end, but the React Native checkout UI is simplified.  Integrating `@stripe/stripe-react-native` to confirm the payment requires further configuration.
* The admin interface and pro app are not included but can be added as separate React/Next.js apps using the same API.
