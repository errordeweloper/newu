import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { FindAllPostDto } from './dto/findAll-post.dto';
import { Pagination } from 'src/common/util/pagination';
import { ApiResponse } from 'src/common/http/ApiResponse';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ){}
  
  async create(createPostDto: CreatePostDto) {
    try {
      const {desc, media, title, users} = createPostDto
      const arrayOfUserObjects = []
      for(const id of users){
        const user = await this.userRepo.findOneBy({id})
        if(!users){
          throw new NotFoundException(`User with id: ${id} not found`)
        }
        arrayOfUserObjects.push(user)
      }
      const post = this.postRepo.create({desc, media, title, users: arrayOfUserObjects})
      await this.postRepo.save(post)
      return 'gooooo'
    } catch (error) {
      throw error
    }
  }

  async findAll(findAllPostDto: FindAllPostDto) {
    try {
      const totalPostCount = await this.postRepo.count()
      const {page, limit} = findAllPostDto;
      const pagination = new Pagination(limit, page, totalPostCount)
      
      const posts = await this.postRepo.find({
        take: pagination.limit,
        skip: pagination.offset,
        relations: ['users'],
        loadRelationIds: true
      })
      return new ApiResponse(posts, pagination)
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.postRepo.findOneBy({id})
      return post
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const {desc, title} = updatePostDto
      const post = await this.postRepo.findOneBy({id})
      if(!post){
        throw new NotFoundException(`Post with id: ${id} not found`)
      }
      this.postRepo.update({id}, {desc})
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      const post = await this.postRepo.findOneBy({id})
      if(!post){
        throw new NotFoundException(`Post with id: ${id} not found`)
      }
      this.postRepo.delete({id})
    } catch (error) {
      throw error
    }
  }
}
