import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.service.upsert({
    where: { slug: 'cleaning' },
    update: {},
    create: { slug: 'cleaning', label: 'Ménage', basePrice: 29 }
  });
  await prisma.service.upsert({
    where: { slug: 'plumbing' },
    update: {},
    create: { slug: 'plumbing', label: 'Plomberie', basePrice: 49 }
  });
  await prisma.service.upsert({
    where: { slug: 'electricity' },
    update: {},
    create: { slug: 'electricity', label: 'Électricité', basePrice: 59 }
  });
}

main().finally(() => prisma.$disconnect());
