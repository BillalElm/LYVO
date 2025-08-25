import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import assert from 'assert';

import { PrismaClient } from '@prisma/client';
import servicesRouter from './routes/services';
import bookingsRouter from './routes/bookings';
import paymentsRouter from './routes/payments';

const app = express();
assert(process.env.DATABASE_URL, 'DATABASE_URL is not defined');
assert(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY is not defined');

const prisma = new Prisma(Clie{t({ log: ['query', 'info', 'warn', 'error'] });

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/services', servicesRouter(prisma));
app.use('/bookings', bookingsRouter(prisma));
app.use('/payments', paymentsRouter(prisma));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`LYVO API running on :${PORT}`));
