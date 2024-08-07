import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstagramModule } from './instagram/instagram.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [InstagramModule, ConfigModule.forRoot({
    isGlobal: true, // Makes the ConfigModule available globally
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
