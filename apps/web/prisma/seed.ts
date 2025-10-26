import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@wtdu.dev' },
    update: {},
    create: {
      email: 'demo@wtdu.dev',
      name: 'Demo User',
    },
  });

  console.log('✅ Demo user created:', user.email);

  // Create reminder due in 5 minutes
  const dueIn5Minutes = new Date(Date.now() + 5 * 60 * 1000);
  
  const reminder = await prisma.reminder.create({
    data: {
      userId: user.id,
      title: 'Demo Reminder',
      note: 'This is a demo reminder set 5 minutes from now',
      dueAt: dueIn5Minutes,
      timezone: 'Europe/Berlin',
      status: 'PENDING',
      createdFrom: 'seed',
    },
  });

  console.log('✅ Demo reminder created:', reminder.title, 'at', reminder.dueAt);
  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

