import { ProfileDocument } from 'schemas/index';
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as normalizeUrl from 'normalize-url';
import { decrypt } from 'lib/crypting';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile')
    private readonly profileModel: Model<ProfileDocument>,
  ) {}
  // @route    GET api/profile/me
  // @desc     Get current users profile
  // @access   Private
  async getProfile(req: any) {
    try {
      const token = req.headers['x-auth-token'];
      const decryptedToken = decrypt(token);
      const profile = await this.profileModel
        .findOne({
          user: decryptedToken.user.id,
        })
        .populate('user', ['name', 'avatar']);

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      return profile;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // @route    POST api/profile
  // @desc     Create or update user profile
  // @access   Private
  async createUpdateProfile(req: any) {
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      ...rest
    } = req.body;
    const token = req.headers['x-auth-token'];
    const decryptedToken = decrypt(token);

    // build a profile
    const profileFields = {
      user: decryptedToken.user.id,
      website:
        website && website !== ''
          ? normalizeUrl(website, { forceHttps: true })
          : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill: string) => ' ' + skill.trim()),
      ...rest,
    };
    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };
    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalizeUrl(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      const profile = await this.profileModel.findOneAndUpdate(
        {
          user: decryptedToken.user.id,
        },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );
      return profile;
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error', 500);
    }
  }

  async getAllProfiles() {
    try {
      const profiles = await this.profileModel
        .find()
        .populate('user', ['name', 'avatar']);
      return profiles;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async getProfileById(req: any) {
    try {
      const profile = await this.profileModel
        .findOne({
          user: req.params.user_id,
        })
        .populate('user', ['name', 'avatar']);
      if (!profile) {
        throw new NotFoundException('Profile not found');
      }
      return profile;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new NotFoundException('Profile not found');
      }

      throw new NotFoundException('Server error');
    }
  }

  async deleteProfile(req: any) {
    try {
      const token = req.headers['x-auth-token'];
      const decryptedToken = decrypt(token);
      const profile = await this.profileModel.findOneAndDelete({
        user: decryptedToken.user.id,
      });

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }
      return {
        message: 'Profile deleted successfully',
      };
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new NotFoundException('Profile not found');
      }

      throw new NotFoundException('Server error');
    }
  }

  async addExperience(req: any) {
    const { title, company, location, from, to, current, description } =
      req.body;
    const token = req.headers['x-auth-token'];
    const decryptedToken = decrypt(token);

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await this.profileModel.findOne({
        user: decryptedToken.user.id,
      });

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      profile.experience.unshift(newExp);
      await profile.save();
      return profile;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new NotFoundException('Profile not found');
      }

      throw new NotFoundException(error.message);
    }
  }

  async deleteExperience(req: any) {
    const { exp_id } = req.params;
    const token = req.headers['x-auth-token'];
    const decryptedToken = decrypt(token);

    try {
      const profile = await this.profileModel.findOne({
        user: decryptedToken.user.id,
      });

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      const removeIndex = profile.experience
        .map((item: any) => item.id)
        .indexOf(exp_id);

      profile.experience.splice(removeIndex, 1);
      await profile.save();
      return profile;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new NotFoundException('Profile not found');
      }

      throw new NotFoundException(error.message);
    }
  }
}
