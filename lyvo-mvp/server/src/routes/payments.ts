import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

export default function paymentsRouter(prisma: PrismaClient) {
  const r = Router();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
  });

  // Create a payment intent for a given booking ID
  r.post('/intent', async (req, res) => {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ error: 'bookingId required' });
    }
    try {
      const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      const amount = booking.amount * 100; // convert to cents
      const intent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        metadata: { bookingId: booking.id },
      });
      res.json({ clientSecret: intent.client_secret });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating payment intent' });
    }
  });

  return r;
}