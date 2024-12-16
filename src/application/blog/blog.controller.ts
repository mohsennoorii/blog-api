import { Controller,Get,Post,Put,Delete,Body,Param,Req,Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog as BlogPost } from './entities/blog.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationQuery } from '@shared/dto';
import { PaginationDefaultsPipe } from '@shared/pipes';
import { CreateBlogDto } from './dto/create-blog.dto';
import { User } from '@shared/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterImageConfig } from '@shared/config/multer/multer.image.config';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(@Query(PaginationDefaultsPipe) query: PaginationQuery): Promise<Pagination<BlogPost>> {
    return await this.blogService.findAll(query);
  }

  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.blogService.findOne(id);
  }

  
  @UseInterceptors(FileInterceptor('image', new MulterImageConfig()))
  @Post()
  async create(
   @Body() body: CreateBlogDto, 
   @User('uid') userId: string,
   @UploadedFile() image: Express.Multer.File
  ) {
    return await this.blogService.create(body,userId,image);
  }
  
  @UseInterceptors(FileInterceptor('image', new MulterImageConfig()))
  @Put(':id')
  update(@Param('id') id: string, 
  @Body() body: UpdateBlogDto, 
  @User('uid') userId: string,
  @UploadedFile() image: Express.Multer.File
  ) {
    this.blogService.update(id,body,userId,image);
  }

  
  @Delete(':id')
  async delete(@Param('id') id: string, @User('uid') userId: string): Promise<void> {
    return await this.blogService.delete(id,userId);
  }
}
