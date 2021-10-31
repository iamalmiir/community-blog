import { Injectable, NotAcceptableException } from '@nestjs/common';
import { registerSchema } from 'validation/auth.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'schemas/user.schema';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { assignAvatar } from 'lib/avatar';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async registerUser(name: string, email: string, password: string) {
    // Validate the user input
    const { error } = registerSchema.validate({ name, email, password });

    if (error) {
      throw new NotAcceptableException(error.message);
    }
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
      // Create a token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });
      // Return the token
      return { token };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
