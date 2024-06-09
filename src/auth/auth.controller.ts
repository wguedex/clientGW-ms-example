import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
 

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post('register')
  registerUser(@Payload() registerUserDto: any){ 
    return this.client.send('auth.register.user', registerUserDto);
  }

  @Post('login')
  loginUser(@Payload() loginUserDto: any){ 
    return this.client.send('auth.login.user', loginUserDto);
  }
 
  @Post('check-token-user')
  verifyTokenUser(@Payload() tokenUserDto: any){ 
    return this.client.send('auth.verify.user', tokenUserDto);
  }
 
}
