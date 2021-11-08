import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from 'middleware/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from 'schemas/user.schema';
import { ProfileSchema } from 'schemas/profile.schema';
import { RegisterModule, AuthModule } from '@auth/index';
import { ProfileModule } from '@profiles/profile.module';
import { AppController, AppService } from './index';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/auth', method: RequestMethod.GET },
        { path: '/api/profile/me', method: RequestMethod.GET },
        { path: '/api/profile', method: RequestMethod.POST },
        { path: '/api/profile', method: RequestMethod.DELETE },
        { path: '/api/profile', method: RequestMethod.PUT },
      );
  }
}
