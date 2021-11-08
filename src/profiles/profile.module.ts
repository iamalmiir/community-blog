import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from 'schemas/profile.schema';
import {
  ProfileController,
  ProfileCreateUpdateController,
  ProfileService,
} from '@profiles/index';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
  ],
  controllers: [ProfileController, ProfileCreateUpdateController],
  providers: [ProfileService],
})
export class ProfileModule {}
