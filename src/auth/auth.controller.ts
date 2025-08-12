import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse, JwtPayload } from './interfaces/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    if (!loginDto.username || !loginDto.password) {
      throw new UnauthorizedException('Username y password son requeridos');
    }

    try {
      return await this.authService.login(loginDto.username, loginDto.password);
    } catch {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  @Post('validate')
  validateToken(@Body('token') token: string): {
    valid: boolean;
    user: JwtPayload;
  } {
    try {
      const payload: JwtPayload = this.authService.validateToken(
        token,
      ) as JwtPayload;
      return { valid: true, user: payload };
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
