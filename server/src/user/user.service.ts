import {  ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {

  constructor(private prismaService : PrismaService, private jwtService : JwtService){};

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where : {
        email : createUserDto.email
      }
    })

    if(user) throw new ConflictException("user already present");

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prismaService.user.create({
      data : {
        name : createUserDto.name, 
        email : createUserDto.email, 
        password : hashedPassword, 
        access_token : '', 
        refresh_token : ''
      }
    })
  }

  async login(loginUserDto : LoginUserDto){
    const user = await this.prismaService.user.findUnique({
      where : {
        email : loginUserDto.email
      }
    })

    if(!user) throw new NotFoundException('user not found');

    const isValidPw = await bcrypt.compare(user.password, loginUserDto.password);

    if(!isValidPw) throw new UnauthorizedException('invalid password')

    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
