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
import { CreateCurrencyDto, UpdateCurrencyDto } from './currency.dto'
import { CurrencyService } from './currency.service'

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Get('')
  find(@Query() dto: BaseQueryDto) {
    return this.currencyService.find(dto)
  }

  @Get('/select')
  findForSelect() {
    return this.currencyService.findForSelect()
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.currencyService.findById(id)
  }

  @Post('')
  create(@Body() dto: CreateCurrencyDto) {
    return this.currencyService.create(dto)
  }

  @Put('/:id')
  update(@Body() dto: UpdateCurrencyDto, @Param('id') id: number) {
    return this.currencyService.update(dto, id)
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.currencyService.delete(id)
  }
}
