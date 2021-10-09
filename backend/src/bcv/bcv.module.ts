import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BCV } from 'src/entities/BCV'
import { BcvController } from './bcv.controller'
import { BcvService } from './bcv.service'

@Module({
  imports: [TypeOrmModule.forFeature([BCV])],
  controllers: [BcvController],
  providers: [BcvService],
})
export class BcvModule {}
