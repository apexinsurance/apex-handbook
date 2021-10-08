import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { BaseQueryDto } from 'src/common/dto/base-query.dto'
import { CreateBankDto, UpdateBankDto } from './bank.dto'
import { BankService } from './bank.service'

@Controller('bank')
export class BankController {
  constructor(private bankService: BankService) {}

  @Get('')
  find(@Query() dto: BaseQueryDto) {
    return this.bankService.find(dto)
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.bankService.findById(id)
  }

  @Post('')
  create(@Body() dto: CreateBankDto) {
    return this.bankService.create(dto)
  }

  @Put('/:id')
  update(@Body() dto: UpdateBankDto, @Param('id') id: number) {
    return this.bankService.update(dto, id)
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.bankService.delete(id)
  }
}
