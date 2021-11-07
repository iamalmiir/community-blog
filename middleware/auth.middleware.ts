import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'schemas/user.schema';
import { Request, Response, NextFunction } from 'express';
import { decrypt } from 'lib/crypting';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-auth-token'];

    if (!token) {
      throw new HttpException('Unauthorized', 401);
    }

    try {
      const decodedToken = await decrypt(token);
      // const decoded = await jwt.verify(decodedToken, process.env.JWT_SECRET);
      const user = await this.userModel.findById(decodedToken.user.id);

      if (!user) {
        throw new HttpException('Unauthorized', 401);
      }

      next();
    } catch (error) {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
