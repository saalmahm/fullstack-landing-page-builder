import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/landing-pages'),
    PagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
