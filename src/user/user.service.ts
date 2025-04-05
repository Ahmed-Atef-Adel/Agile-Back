import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import {
  Expose,
  SuccessStatusCodesEnum,
  ErrorStatusCodesEnum,
} from 'src/classes';

@Injectable()
export class UserService {
  constructor(
    private readonly response: Expose,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const hashPass = await bcrypt.hash(createUserDto.password, 10);
      const newUser = await this.userRepository.save({...createUserDto, password: hashPass });
      const access_token = await this.jwtService.generateAccessToken(newUser.id)
      const res = {newUser, access_token}
      return this.response.success( SuccessStatusCodesEnum.Ok, "Created Successfully", res);
    }catch(error){
      return this.response.error( error, ErrorStatusCodesEnum.BadRequest )
    }
  }

  async updateAccessToken(userId: number, accessToken: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        console.log('User not found');
        return;
      }
      user.accessToken = accessToken;
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }


  async logIn(loginDto: LoginDto){
    try{
      const user = await this.userRepository.findOne({where:{email:loginDto.email}})
      if(!user){
        return this.response.error("email not found", ErrorStatusCodesEnum.BadRequest )
      }
      const correctPass = await bcrypt.compare(loginDto.password,user.password);
      if(!correctPass){
        return this.response.error("wrong password", ErrorStatusCodesEnum.BadRequest )
      }
      const accessToken = await this.jwtService.generateAccessToken({id: user.id})
      const res =  {accessToken, user}
      return this.response.success( SuccessStatusCodesEnum.Ok, "Created Successfully", res);
    }catch(err){
      return this.response.error("email not found", ErrorStatusCodesEnum.InternalServerError )
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
