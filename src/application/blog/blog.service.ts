import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate,Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PaginationQuery } from '@shared/dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import * as fs from 'fs';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly repository: Repository<Blog>,
  ) {}

  async findAll(query: PaginationQuery): Promise<Pagination<Blog>> {
    
    return await paginate(this.repository,query);
    
  }

  async findOne(id: string) {
    
    try {

      return await this.repository.findOneByOrFail({id: id});

    }
    catch(error) {

      throw new NotFoundException();

    }

  }

  create(body: CreateBlogDto,authorId: string,image?: Express.Multer.File) {
    
    let filename: string;

    if(image) { 
      filename = image.filename;
    }

    return this.repository.save({...body,authorId: authorId, image: filename});
    
  }

  async update(id: string,body: UpdateBlogDto, userId: string, image?: Express.Multer.File) {
    
    if(!this.isOwner(id,userId)) throw new UnauthorizedException();

    const blogToupdate: Blog = await this.findOne(id);

    if(image) {

      fs.unlink(blogToupdate.image,(error) => { 
        if(error) throw error;
        console.log(image,": deleted");
      });

    }

    await this.repository.update(id,{ ...blogToupdate, ...body, image: image.filename });

  }

  async delete(id: string,userId: string) {

    if(!this.isOwner(id,userId)) throw new UnauthorizedException();

    await this.repository.softDelete({id: id});

  }

  async isOwner(id: string, userId: string): Promise<boolean> {
    
    const blog  = await this.findOne(id);

    return (blog.authorId === userId);

  }
}
