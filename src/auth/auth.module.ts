import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'schemas/user.schema';
import {
  LoginService,
  LoginController,
  RegisterController,
  RegisterService,
} from './index';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [RegisterController, LoginController],
  providers: [RegisterService, LoginService],
})
export class UserModule {}
