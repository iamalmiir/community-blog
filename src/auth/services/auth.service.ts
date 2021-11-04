import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'schemas/user.schema';
import { encrypt, decrypt } from 'lib/crypting';
import * as jwt from 'jsonwebtoken';
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
      // Create a token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });
      // Encrypt token
      const encryptedToken = encrypt(token);
      // Return the token
      return { token: encryptedToken };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async useIt(req: any) {
    const token = req.headers['x-auth-token'];
    const decryptedToken = decrypt(token);
    const verifiedToken = jwt.verify(decryptedToken, process.env.JWT_SECRET);
    const user = await this.userModel
      .findById(verifiedToken.user.id)
      .select('-password');
    return user;
  }
}
