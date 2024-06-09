import { Controller, Get, Post, Inject, Query, Body } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { LoginUserDto, RegisterUserDto } from './dto';
 

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto){ 
    console.log(registerUserDto)
    // return this.client.send('auth.register.user', registerUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){ 
    console.log(loginUserDto)
    // return this.client.send('auth.login.user', loginUserDto);
  }
 
  @Get('verify')
  verifyUser(@Query('token') token: string){ 
    // return this.client.send('auth.verify.user', tokenUserDto);
  }
 
}
