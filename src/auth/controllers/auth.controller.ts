import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly loginService: AuthService) {}
  // @route    POST api/auth
  // @desc     Authenticate user & get token
  // @access   Public
  @Post()
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const res = await this.loginService.loginUser(email, password);
    return res;
  }

  // @route    GET api/auth
  // @desc     Get user by token
  // @access   Private
  @Get()
  async getUser() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await this.loginService.getUser();
    return res;
  }
}
