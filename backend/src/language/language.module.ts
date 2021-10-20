import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Language } from 'src/entities/Language'
import { LanguageService } from './language.service'

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}
