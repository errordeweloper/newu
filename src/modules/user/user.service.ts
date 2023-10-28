import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encryptWithAES } from 'src/common/util/hashing.config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/util/pagination';
import { ApiResponse } from 'src/common/http/ApiResponse';
import { FindAllUserDto } from './dto/findAll-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}
  create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = encryptWithAES(createUserDto.password)
      const user = this.userRepo.create(createUserDto)
      this.userRepo.save(user)  
    } catch (error) {
      throw error
    }
  }

  async findAll(findAllUserDto: FindAllUserDto) {
    try {
      const totalPostCount = await this.userRepo.count()
      const {page, limit} = findAllUserDto;
      const pagination = new Pagination(limit, page, totalPostCount)
      
      const posts = await this.userRepo.find({
        take: pagination.limit,
        skip: pagination.offset,
        relations: ['posts'],
        loadRelationIds: true
      })
      return new ApiResponse(posts, pagination)
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOneBy({id})
      console.log(await this.userRepo.find());
      
      return user
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const {email} = updateUserDto
      if (email) {
        const user = await this.userRepo.findOneBy({email: updateUserDto.email})
        if (user) {
          throw new BadRequestException(`User with email: ${email} already exists`)
        }
      }
      this.userRepo.update({id}, updateUserDto)
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepo.findOneBy({id})
      if(!user){
        throw new NotFoundException(`User with id: ${id} not found`)
      }
      this.userRepo.delete({id})
    } catch (error) {
      throw error
    }
  }
}
