import { Request as Req } from 'express';
import { loginSchema } from 'validation/auth.schemas';
import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  NotAcceptableException,
} from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly loginService: AuthService) {}
  // @route    POST api/auth
  // @desc     Authenticate user & get token
  // @access   Public
  @Post()
  async loginUser(
    @Request() req: Req,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new NotAcceptableException(error.message);
    }
    const res = await this.loginService.loginUser(email, password);
    return res;
  }

  // @route    GET api/auth
  // @desc     Get user by token
  // @access   Private
  @Get()
  async getUser(@Request() req: Req) {
    const user = await this.loginService.getUser(req);
    return user;
  }
}
