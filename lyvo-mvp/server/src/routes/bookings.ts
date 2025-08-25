import { Router } from 'express';
import { PrismaClient, BookingStatus } from '@prisma/client';

export default function bookingsRouter(prisma: PrismaClient) {
  const r = Router();

  // Create a new booking (client initiates a service request)
  r.post('/', async (req, res) => {
    const { serviceId, address, datetime, notes } = req.body;
    try {
      // In a real implementation you'd extract the authenticated user from the request
      // For the MVP we upsert a demo client
      const client = await prisma.user.upsert({
        where: { email: 'demo@client.lyvo' },
        update: {},
        create: { email: 'demo@client.lyvo', role: 'CLIENT', name: 'Client Démo' }
      });
      const service = await prisma.service.findUnique({ where: { id: serviceId } });
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      const booking = await prisma.booking.create({
        data: {
          serviceId,
          clientId: client.id,
          address,
          datetime,
          notes,
          amount: service.basePrice,
        }
      });
      res.json(booking);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Retrieve a booking by its ID, including relations
  r.get('/:id', async (req, res) => {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: req.params.id },
        include: { service: true, client: true, pro: true }
      });
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(booking);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Accept a booking (provider) – sets proId and status
  r.post('/:id/accept', async (req, res) => {
    try {
      // In a real implementation you'd extract the authenticated provider
      const pro = await prisma.user.upsert({
        where: { email: 'demo@pro.lyvo' },
        update: {},
        create: { email: 'demo@pro.lyvo', role: 'PRO', name: 'Pro Démo' }
      });
      const updated = await prisma.booking.update({
        where: { id: req.params.id },
        data: { proId: pro.id, status: BookingStatus.ACCEPTED }
      });
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Confirm completion (client) – marks booking as DONE
  r.post('/:id/confirm', async (req, res) => {
    try {
      const updated = await prisma.booking.update({
        where: { id: req.params.id },
        data: { status: BookingStatus.DONE }
      });
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return r;
}