import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  url!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;
}