import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy/jwt.strategy.js';
import { PassportModule } from '@nestjs/passport';

@Module({
    providers : [JwtStrategy], 
    imports : [PassportModule], 
    exports : [PassportModule]
})
export class AuthModule {}
