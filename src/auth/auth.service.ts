import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [{ id: 1, username: 'cata', password: 'notsecure' }];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }: AuthDto) {
    const findUser = fakeUsers.find((user) => user.username === username);
    if (findUser) {
      if (password === findUser.password) {
        const { password, ...user } = findUser;
        return this.jwtService.sign(user);
      }
    }
    return null;
  }
}
