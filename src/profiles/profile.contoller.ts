import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Request,
  HttpException,
} from '@nestjs/common';
import {
  profileValidation,
  validateExperience,
  validateEducation,
} from 'validation/profile.schemas';
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
  // @route    POST api/profile
  // @desc     Create or update user profile
  // @access   Private
  @Post()
  async createUpdateProfile(@Request() req: any) {
    const { error } = profileValidation.validate(req.body);
    if (error) {
      throw new HttpException(error.details[0].message, 400);
    }
    return await this.profileService.createUpdateProfile(req);
  }

  // @route    GET api/profile
  // @desc     Get all profiles
  // @access   Public
  @Get()
  async getProfiles() {
    return await this.profileService.getAllProfiles();
  }

  // @route    GET api/profile/:id
  // @desc     Get profile by ID
  // @access   Public
  @Get('/user/:user_id')
  async getProfileById(@Request() req: any) {
    return await this.profileService.getProfileById(req);
  }

  // @route    DELETE api/profile
  // @desc     Delete profile, user & posts
  // @access   Private
  @Delete()
  async deleteProfile(@Request() req: any) {
    return await this.profileService.deleteProfile(req);
  }

  // @route    PUT api/profile/experience
  // @desc     Add profile experience
  // @access   Private
  @Put('/experience')
  async addExperience(@Request() req: any) {
    const { error } = validateExperience.validate(req.body);
    if (error) {
      throw new HttpException(error.details[0].message, 400);
    }
    return await this.profileService.addExperience(req);
  }

  // @route    DELETE api/profile/experience/:exp_id
  // @desc     Delete experience from profile
  // @access   Private
  @Delete('/experience/:exp_id')
  async deleteExperience(@Request() req: any) {
    return await this.profileService.deleteExperience(req);
  }

  // @route    PUT api/profile/education
  // @desc     Add profile education
  // @access   Private
  @Put('/education')
  async addEducation(@Request() req: any) {
    const { error } = validateEducation.validate(req.body);
    if (error) {
      throw new HttpException(error.details[0].message, 400);
    }
    return await this.profileService.addEducation(req);
  }

  // @route    DELETE api/profile/education/:edu_id
  // @desc     Delete education from profile
  // @access   Private
  @Delete('/education/:edu_id')
  async deleteEducation(@Request() req: any) {
    return await this.profileService.deleteEducation(req);
  }

  // @route    GET api/profile/github/:username
  // @desc     Get user repos from Github
  // @access   Public
  @Get('/github/:username')
  async getGithubRepos(@Request() req: any) {
    return await this.profileService.getGithubRepos(req);
  }
}
