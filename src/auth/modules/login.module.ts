import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'schemas/user.schema';
import { LoginController, LoginService } from '@auth/index';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
