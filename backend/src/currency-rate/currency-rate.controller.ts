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
import {
  CreateCurrencyRateDto,
  UpdateCurrencyRateDto,
} from './currency-rate.dto'
import { CurrencyRateService } from './currency-rate.service'

@Controller('currency-rate')
export class CurrencyRateController {
  constructor(private currencyRateService: CurrencyRateService) {}

  @Get('')
  find(@Query() dto: BaseQueryDto) {
    return this.currencyRateService.find(dto)
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.currencyRateService.findById(id)
  }

  @Post('')
  create(@Body() dto: CreateCurrencyRateDto) {
    return this.currencyRateService.create(dto)
  }

  @Put('/:id')
  update(@Body() dto: UpdateCurrencyRateDto, @Param('id') id: number) {
    return this.currencyRateService.update(dto, id)
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.currencyRateService.delete(id)
  }
}
