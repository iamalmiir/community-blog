import { Controller, Get, Post, Request, HttpException } from '@nestjs/common';
import { profileValidation } from 'validation/profile.schemas';
import { ProfileService } from '@profiles/index';

@Controller('/api/profile/me')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  // @route    GET api/profile/me
  // @desc     Get current users profile
  // @access   Private
  @Get()
  async getProfile(@Request() req: any) {
    return await this.profileService.getProfile(req);
  }
}

@Controller('/api/profile')
export class ProfileCreateUpdateController {
  constructor(private readonly profileService: ProfileService) {}
  // @route    GET api/profile/me
  // @desc     Get current users profile
  // @access   Private
  @Post()
  async createUpdateProfile(@Request() req: any) {
    const { error } = profileValidation.validate(req.body);
    if (error) {
      throw new HttpException(error.details[0].message, 400);
    }
    return await this.profileService.createUpdateProfile(req);
  }
}
