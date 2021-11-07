import { Injectable, NotAcceptableException } from '@nestjs/common';
import { encrypt } from 'lib/crypting';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { assignAvatar } from 'lib/avatar';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async registerUser(name: string, email: string, password: string) {
    try {
      const salt = await bcrypt.genSalt(15);
      const hashedPassword = await bcrypt.hash(password, salt);
      const avatar = await assignAvatar(email);
      const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
        avatar,
      });
      await newUser.save();
      const payload = {
        user: {
          id: newUser.id,
        },
      };

      const encryptedToken = await encrypt(payload);
      // Return the token
      return { token: encryptedToken };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
