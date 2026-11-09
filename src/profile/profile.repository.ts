import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface ProfileRelations {
  skills: boolean;
  experience: boolean;
  projects: boolean;
}

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProfile(relations: ProfileRelations) {
    return this.prisma.profile.findFirst({
      include: {
        skills: relations.skills,
        experience: relations.experience,
        projects: relations.projects,
      },
    });
  }
}