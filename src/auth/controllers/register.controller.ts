import {
  Controller,
  Post,
  Body,
  NotAcceptableException,
  Request,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { RegisterService } from '@auth/services/register.service';
import { registerSchema } from 'validation/auth.schemas';

@Controller('/api/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  registerUser(
    @Request() req: Req,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      throw new NotAcceptableException(error.message);
    }

    const res = this.registerService.registerUser(name, email, password);
    return res;
  }
}
