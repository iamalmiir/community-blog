import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'schemas/user.schema';

import { RegisterController, RegisterService } from '@auth/index';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
