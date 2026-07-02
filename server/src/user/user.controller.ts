import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import type { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private COOKIE = 'et_A' 

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.userService.create(createUserDto);
    res.cookie(this.COOKIE, result.access_token, {
      httpOnly: true,
      secure: false,      // true in production with HTTPS
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });
    return result;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({passthrough :true}) res : Response) {
    const result = await this.userService.login(loginUserDto);
    res.cookie(this.COOKIE, result.access_token, {
      httpOnly: true,
      secure: false,      // true in production with HTTPS
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });
    return result;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
