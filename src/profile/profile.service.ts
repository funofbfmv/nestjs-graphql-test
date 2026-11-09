import { Injectable } from '@nestjs/common';

import {
  ProfileRepository,
  type ProfileRelations,
} from './profile.repository.js';

import { ProfileModel } from './models/profile.model.js';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
  ) {}

  async getProfile(
    relations: ProfileRelations,
  ): Promise<ProfileModel | null> {
    const profile = await this.profileRepository.findProfile(relations);

    if (!profile) {
      return null;
    }

    return {
      ...profile,
      skills: profile.skills ?? [],
      experience: profile.experience ?? [],
      projects: profile.projects ?? [],
    };
  }
}