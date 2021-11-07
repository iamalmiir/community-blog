import { ConfigModule } from '@nestjs/config';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserSchema } from 'schemas/user.schema';
import { ProfileSchema } from 'schemas/profile.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule, AuthModule } from '@auth/index';
import { ProfileModule } from '@profiles/profile.module';
import { AuthMiddleware } from 'middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Profile', schema: ProfileSchema },
    ]),
    AuthModule,
    RegisterModule,
    ProfileModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/auth', method: RequestMethod.GET },
        { path: '/api/profile/me', method: RequestMethod.GET },
        { path: '/api/profile', method: RequestMethod.ALL },
      );
  }
}
