import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bank } from 'src/entities/Bank'
import { BankTranslation } from 'src/entities/BankTranslation'
import { Language } from 'src/entities/Language'
import { BankController } from './bank.controller'
import { BankService } from './bank.service'

@Module({
  imports: [TypeOrmModule.forFeature([Bank, BankTranslation, Language])],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
