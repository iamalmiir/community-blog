import { Injectable, NotAcceptableException } from '@nestjs/common';
import { loginSchema } from 'validation/auth.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'schemas/user.schema';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async loginUser(email: string, password: string) {
    const { error } = loginSchema.validate({ email, password });
    if (error) {
      throw new NotAcceptableException(error.message);
    }
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotAcceptableException('Invalid email or password');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new NotAcceptableException('Invalid email or password');
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      // Create a token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });

      const encryptedToken = CryptoJS.AES.encrypt(
        token,
        process.env.ENC_KEY,
      ).toString();

      // Return the token
      return { token: encryptedToken };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
