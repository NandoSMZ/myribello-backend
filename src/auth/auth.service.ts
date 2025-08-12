import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminUser, LoginResponse } from './interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  // Credenciales del administrador
  private readonly adminCredentials = {
    username: 'admin',
    passwordHash:
      '$2b$10$SzxlM6omsAxMk4kgDvU7mubAiwVw4PxNGUonP0go5wAeFA3YuTaOu', // Hash de 'admin123'
  };

  constructor(private readonly jwtService: JwtService) {}

  async validateAdmin(username: string, password: string): Promise<AdminUser> {
    if (!username || !password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (username !== this.adminCredentials.username) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Validación real con bcrypt
    const isPasswordValid = await bcrypt.compare(
      password,
      this.adminCredentials.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return { username: this.adminCredentials.username, role: 'admin' };
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const admin: AdminUser = await this.validateAdmin(username, password);

    const payload = {
      username: admin.username,
      role: admin.role,
      sub: 'admin-ribello',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        username: admin.username,
        role: admin.role,
      },
    };
  }

  validateToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
