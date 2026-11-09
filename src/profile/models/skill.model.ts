import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SkillModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;
}