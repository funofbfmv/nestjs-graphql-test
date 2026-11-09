import { Field, ID, ObjectType } from '@nestjs/graphql';

import { SkillModel } from './skill.model.js';
import { ExperienceModel } from './experience.model.js';
import { ProjectModel } from './project.model.js';

@ObjectType()
export class ProfileModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => String, { nullable: true })
  githubUrl!: string | null;

  @Field(() => String, { nullable: true })
  linkedinUrl!: string | null;

  @Field(() => [SkillModel])
  skills!: SkillModel[];

  @Field(() => [ExperienceModel])
  experience!: ExperienceModel[];

  @Field(() => [ProjectModel])
  projects!: ProjectModel[];
}