import { Controller, Get, Request } from '@nestjs/common';
import { Request as Req } from 'express';
import { ProfileService } from '@profiles/index';

@Controller('/api/profile/me')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Request() req: Req) {
    return this.profileService.getProfile(req);
  }
}
