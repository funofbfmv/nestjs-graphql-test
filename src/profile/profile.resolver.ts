import { Info, Query, Resolver } from '@nestjs/graphql';
import {
  type GraphQLResolveInfo,
  type SelectionSetNode,
} from 'graphql';

import { ProfileModel } from './models/profile.model.js';
import { ProfileService } from './profile.service.js';
import type { ProfileRelations } from './profile.repository.js';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Query(() => ProfileModel, {
    nullable: true,
    description: 'Получить профиль разработчика',
  })
  async profile(
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfileModel | null> {
    const requestedFields = new Set<string>();
    const visitedFragments = new Set<string>();

    const collectFields = (
      selectionSet: SelectionSetNode,
    ): void => {
      for (const selection of selectionSet.selections) {
        if (selection.kind === 'Field') {
          requestedFields.add(selection.name.value);
        }

        if (selection.kind === 'InlineFragment') {
          collectFields(selection.selectionSet);
        }

        if (selection.kind === 'FragmentSpread') {
          const name = selection.name.value;

          if (visitedFragments.has(name)) continue;
          visitedFragments.add(name);

          const fragment = info.fragments[name];

          if (fragment) {
            collectFields(fragment.selectionSet);
          }
        }
      }
    };

    for (const fieldNode of info.fieldNodes) {
      if (fieldNode.selectionSet) {
        collectFields(fieldNode.selectionSet);
      }
    }

    const relations: ProfileRelations = {
      skills: requestedFields.has('skills'),
      experience: requestedFields.has('experience'),
      projects: requestedFields.has('projects'),
    };

    return this.profileService.getProfile(relations);
  }
}