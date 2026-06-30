import {  ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';


@Injectable()
export class UserService {

  constructor(private prismaService : PrismaService, private jwtService : JwtService){};

  private payload(id : number, email : string) {
    return { id, email };
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where : {
        email : createUserDto.email
      }
    })

    if(user) throw new ConflictException("user already present");

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    
    const newUser = await this.prismaService.user.create({
      data : {
        name : createUserDto.name, 
        email : createUserDto.email, 
        password : hashedPassword, 
        refresh_token : ''
      }
    });

    
    const accessToken = await this.jwtService.signAsync(this.payload(newUser.id, createUserDto.email));
    
     return {
      access_token: accessToken,
      user: {
        name: createUserDto.name,
        email: createUserDto.email,
      },
    }
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

    // const payload = {
    //   id: user.id,
    //   email: user.email,
    // };

    const accessToken = await this.jwtService.signAsync(this.payload(user.id, user.email));

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
