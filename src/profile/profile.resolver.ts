import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ProfileResolver {
  @Query(() => String, {
    description: 'Проверка доступности GraphQL API',
  })
  health(): string {
    return 'GraphQL схемы работают!';
  }

  @Query(() => String, {
    description: 'Тестовый запрос Check',
  })
  check(): string {
    return 'Запрос Чекнут!';
  }
}