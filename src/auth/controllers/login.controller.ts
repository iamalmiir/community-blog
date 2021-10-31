import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../services/login.service';

@Controller('/api/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  loginUser(@Body('email') email: string, @Body('password') password: string) {
    const res: any = this.loginService.loginUser(email, password);
    return res;
  }
}
