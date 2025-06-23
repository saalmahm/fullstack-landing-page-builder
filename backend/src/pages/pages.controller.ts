import { Controller, Post, Get, Param, Body, Put, Delete, Patch, Query, Logger } from '@nestjs/common';
import { PagesService } from './pages.service';
import { Page } from './page.entity';

@Controller('pages')
export class PagesController {
  private readonly logger = new Logger(PagesController.name);

  constructor(private readonly pagesService: PagesService) {}

  @Post()
  create(@Body() createPageDto: any) {
    this.logger.log('Received create page request', createPageDto);
    return this.pagesService.create(createPageDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('sort') sort: string = 'updatedAt') {
    const skip = (page - 1) * limit;
    return this.pagesService.findAll(skip, limit, sort);
  }

  @Get('search')
  search(@Query('query') query: string, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.pagesService.search(query, skip, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: any) {
    return this.pagesService.update(id, updatePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }
}
