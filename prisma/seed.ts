
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const PROFILE_ID = '00000000-0000-4000-8000-000000000001';

const profileData = {
  name: 'Дмитрий Мазурек',

  description:
    'Fullstack-разработчик с опытом более 4 лет. Специализируюсь на разработке веб-приложений, проектировании серверной архитектуры, интеграции API и работе с базами данных. Разрабатываю и поддерживаю проекты от идеи до запуска в продакшен.',

  githubUrl: 'https://github.com/funofbfmv',
  linkedinUrl: 'https://www.linkedin.com/in/dmitriy-mazurek-a69330247/',

    skills: [
    // Languages
    'Python 3',
    'JavaScript',
    'TypeScript',

    // Backend
    'Node.js',
    'NestJS',
    'FastAPI',
    'Django',
    'aiogram',

    // Frontend & Mobile
    'React',
    'React Native',

    // API
    'GraphQL',
    'REST API',

    // Databases & ORM
    'PostgreSQL',
    'Prisma ORM',

    // DevOps & Tools
    'Docker',
    'Git',
    ],

  experience: [
    {
      company: 'Собственные и коммерческие проекты',
      position: 'Fullstack Developer',
      startDate: new Date('2022-06-11'),
      endDate: null,
      achievements: [
        'Разработка и поддержка веб-приложений полного цикла.',
        'Проектирование серверной архитектуры и API.',
        'Интеграция сторонних сервисов и автоматизация бизнес-процессов.',
        'Разработка структуры баз данных и оптимизация запросов.',
        'Развёртывание и сопровождение приложений.',
      ],
    },
  ],

  projects: [
    {
      name: 'Ion1',
      url: 'https://ion1.ru/',
      description:
        'Веб-платформа для встреч, общения и новых возможностей.',
    },
    {
      name: 'WB2OZON',
      url: 'https://wb2ozon.ru/',
      description:
        'Проект, связанный с маркетплейсами и автоматизацией рабочих процессов.',
    },
    {
      name: 'Fold Flow',
      url: 'https://fold-flow.com/',
      description:
        'Инструмент для процедурного создания складок ткани в 3ds Max.',
    },
  ],
};

async function main(): Promise<void> {
  const { skills, experience, projects, ...profile } = profileData;

  await prisma.profile.upsert({
    where: { id: PROFILE_ID },

    create: {
      id: PROFILE_ID,
      ...profile,

      skills: {
        create: skills.map((name) => ({ name })),
      },

      experience: {
        create: experience,
      },

      projects: {
        create: projects,
      },
    },

    update: {
      ...profile,

      skills: {
        deleteMany: {},
        create: skills.map((name) => ({ name })),
      },

      experience: {
        deleteMany: {},
        create: experience,
      },

      projects: {
        deleteMany: {},
        create: projects,
      },
    },
  });

  console.log('База данных успешно заполнена');
}

main()
  .catch((error: unknown) => {
    console.error('Ошибка заполнения БД:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
