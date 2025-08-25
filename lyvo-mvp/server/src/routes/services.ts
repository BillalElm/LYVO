import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

export default (prisma: PrismaClient) => {
  const r = Router();
  r.get('/', async (_req, res) => {
    const list = await prisma.service.findMany();
    res.json(list);
  });
  return r;
};
