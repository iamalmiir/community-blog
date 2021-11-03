import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from '@auth/services/register.service';

@Controller('/api/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  registerUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const res = this.registerService.registerUser(name, email, password);
    return res;
  }
}
