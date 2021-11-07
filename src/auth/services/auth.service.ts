import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'schemas/user.schema';
import { encrypt, decrypt } from 'lib/crypting';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async loginUser(email: string, password: string) {
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
      // Encrypt token
      const encryptedToken = await encrypt(payload);
      // Return the token
      return { token: encryptedToken };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async getUser(req: any) {
    const token = await req.headers['x-auth-token'];
    const decryptedToken = await decrypt(token);
    const user = await this.userModel
      .findById(decryptedToken.user.id)
      .select('-password');
    return user;
  }
}
