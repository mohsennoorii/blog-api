import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async singUp(@Body() dto: SignUpDto) {
    return await this.authService.singUp(dto);
  }

  @Post('/verify-email')
  verifyEmail(dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Put(':id')
  update(@Param('id') id: string) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }

}
