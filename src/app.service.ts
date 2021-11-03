import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'schemas/user.schema';

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
