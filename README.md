# NestJS GraphQL Developer Card

Backend-приложение цифровой визитки разработчика **Dmitry Mazurek**, реализованное на NestJS с использованием GraphQL, Prisma и PostgreSQL.

Приложение предоставляет информацию о разработчике, его навыках, профессиональном опыте и проектах через GraphQL API и Apollo Sandbox.

## Технологический стек

- **Backend:** Node.js, TypeScript, NestJS
- **API:** GraphQL, Apollo Server
- **Database:** PostgreSQL 17
- **ORM:** Prisma 7
- **Containerization:** Docker, Docker Compose
- **Version Control:** Git

## Архитектура

Проект построен на модульной архитектуре NestJS с разделением ответственности:

```text
GraphQL Resolver
       ↓
ProfileService
       ↓
ProfileRepository
       ↓
PrismaService
       ↓
PostgreSQL
```

- **Resolver** — принимает GraphQL-запросы.
- **Service** — отвечает за бизнес-логику.
- **Repository** — выполняет запросы к базе данных.
- **PrismaService** — управляет подключением к PostgreSQL.

Такое разделение упрощает тестирование, поддержку и расширение приложения.

## GraphQL API

Приложение использует подход **Code First**: GraphQL-схема автоматически генерируется на основе TypeScript-классов и декораторов NestJS.

Основной запрос:

```graphql
query {
  profile {
    name
    description
    skills {
      name
    }
    experience {
      company
      position
    }
    projects {
      name
    }
  }
}
```

GraphQL позволяет запрашивать только необходимые поля.

Для оптимизации вложенных данных используются Prisma `include` и анализ запрошенных GraphQL-полей. Это позволяет не загружать ненужные связи и избегать проблемы N+1 при получении профиля.

## База данных

В PostgreSQL используются четыре связанные модели:

- `Profile` — информация о разработчике.
- `Skill` — технические навыки.
- `Experience` — профессиональный опыт.
- `Project` — реализованные проекты.

Структура базы управляется через Prisma Migrations.

## Автоматическая инициализация

При запуске Docker Compose приложение автоматически:

1. Запускает PostgreSQL.
2. Ожидает готовности базы данных.
3. Применяет миграции через `prisma migrate deploy`.
4. Заполняет базу через `prisma db seed`.
5. Запускает NestJS API.

Seed использует `upsert`, поэтому повторная инициализация не создаёт дубликатов профиля и связанных записей.

## Запуск

Требования: установленные Docker и Docker Compose.

```bash
git clone https://github.com/funofbfmv/nestjs-graphql-test.git
cd nestjs-graphql-test
docker compose up --build -d
```

После запуска Apollo Sandbox доступен по адресу:

**http://localhost:3000/graphql**

Просмотр логов:

```bash
docker compose logs -f api
```

Остановка приложения:

```bash
docker compose down
```

PostgreSQL доступен локально через порт `5433`, а внутри Docker-сети — через `postgres:5432`.

## Архитектурные решения

**NestJS** выбран благодаря модульной архитектуре и Dependency Injection.

**GraphQL Code First** обеспечивает типизированный API и автоматическую генерацию схемы.

**Prisma** предоставляет типобезопасную работу с PostgreSQL и управление миграциями.

**PostgreSQL** используется для хранения структурированных данных со связями между сущностями.

**Docker Compose** обеспечивает воспроизводимый запуск приложения без ручной настройки базы данных.

## Автор

**Dmitry Mazurek — Fullstack Developer**

- GitHub: https://github.com/funofbfmv
- LinkedIn: https://www.linkedin.com/in/dmitriy-mazurek-a69330247/
- Telegram: https://t.me/mason_mzk/