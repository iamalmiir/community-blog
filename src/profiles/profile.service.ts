import { ProfileDocument } from 'schemas/index';
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
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
      const verifiedToken = jwt.verify(decryptedToken, process.env.JWT_SECRET);
      const profile = await this.profileModel.findOne({
        user: verifiedToken.user.id,
      });

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
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    const token = req.headers['x-auth-token'];
    const decryptedToken = decrypt(token);
    const verifiedToken = jwt.verify(decryptedToken, process.env.JWT_SECRET);

    // build a profile
    const profileFields = {
      user: verifiedToken.user.id,
      website:
        website && website !== ''
          ? normalizeUrl(website, { forceHttps: true })
          : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
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
          user: verifiedToken.user.id,
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
}
