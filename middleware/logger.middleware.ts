import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'schemas/user.schema';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-auth-token'];

    if (!token) {
      throw new HttpException('Unauthorized', 401);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = this.userModel.findById(decoded.id);
      if (!user) {
        throw new HttpException('Unauthorized', 401);
      }

      next();
    } catch (error) {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
