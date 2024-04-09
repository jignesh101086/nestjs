import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './deos/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Authenticate user
   * @param signInDto Data for user authentication
   * @returns JWT token upon successful authentication
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ description: 'Data for user authentication', type: LoginDto })
  @ApiResponse({ status: 200, description: 'Authenticated successfully. Returns JWT token.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials.' })
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}