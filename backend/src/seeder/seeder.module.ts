import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Language } from 'src/entities/Language'
import { LanguageModule } from 'src/language/language.module'
import { LanguageService } from 'src/language/language.service'
import { SeederService } from './seeder.service'

@Module({
  imports: [LanguageModule, TypeOrmModule.forFeature([Language])],
  providers: [SeederService, Logger, LanguageService],
})
export class SeederModule {}
