import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Language } from 'src/entities/Language'
import { Unit } from 'src/entities/Unit'
import { UnitTranslation } from 'src/entities/UnitTranslation'
import { BcvController } from './bcv.controller'
import { BcvService } from './bcv.service'

@Module({
  imports: [TypeOrmModule.forFeature([Unit, UnitTranslation, Language])],
  controllers: [BcvController],
  providers: [BcvService],
})
export class BcvModule {}
