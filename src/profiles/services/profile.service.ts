import { ProfileDocument } from 'schemas/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
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
}
