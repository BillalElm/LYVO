import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding ATLAS OPS database…')

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'contact@atlasops.fr' },
    update: {},
    create: {
      email: 'contact@atlasops.fr',
      name: 'Billal — ATLAS OPS',
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user:', admin.email)

  // Demo prospect
  const prospect = await prisma.prospect.upsert({
    where: { id: 'demo-prospect-1' },
    update: {},
    create: {
      id: 'demo-prospect-1',
      companyName: 'Martin SARL — Rénovation BTP',
      contactName: 'Thomas Martin',
      contactEmail: 'thomas@martin-btp.fr',
      contactPhone: '06 12 34 56 78',
      sector: 'BTP',
      source: 'TERRAIN',
      status: 'DIAGNOSTIC_DONE',
      estimatedQuotes: 18,
      estimatedHours: 4,
      diagnosticDate: new Date('2026-03-15'),
      diagnosticNotes: 'Envoie 18 devis/mois. Zéro relance systématique. Perd 5-6 devis/mois. Fort potentiel.',
      recommendedPack: 'STANDARD',
      notes: 'Très réceptif. Commercial terrain expérimenté. Décision attendue fin mars.',
    },
  })
  console.log('✅ Demo prospect:', prospect.companyName)

  console.log('🎉 Seed terminé.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
