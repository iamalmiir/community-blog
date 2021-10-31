import { Injectable, NotFoundException } from '@nestjs/common';
// import { User } from 'types/user.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'schemas/user.schema';

import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async registerUser(name: string, email: string, password: string) {
    const newUser = new this.userModel({
      name,
      email,
      password,
    });
    return await newUser.save();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
