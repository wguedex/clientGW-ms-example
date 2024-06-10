import { Controller, Get, Post, Inject, Query, Body } from '@nestjs/common';
import { ClientProxy, Payload, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
 

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto){  
    return this.client.send('auth.register.user', registerUserDto)
    .pipe(catchError((error)=>{
      throw new RpcException(error)
    }));
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
 
  @Get('verify')
  verifyUser(@Query('token') token: string){ 
    // return this.client.send('auth.verify.user', tokenUserDto);
  }
 
}
