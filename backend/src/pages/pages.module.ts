import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { Page, PageSchema } from './page.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }])
  ],
  providers: [PagesService],
  controllers: [PagesController]
})
export class PagesModule {}
