import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Language } from 'src/entities/Language'
import { Unit } from 'src/entities/Unit'
import { UnitTranslation } from 'src/entities/UnitTranslation'
import { UnitController } from './unit.controller'
import { UnitService } from './unit.service'

@Module({
  imports: [TypeOrmModule.forFeature([Unit, UnitTranslation, Language])],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
