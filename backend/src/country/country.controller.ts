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
import { CreateCountryDto, UpdateCountryDto } from './country.dto'
import { CountryService } from './country.service'

@Controller('country')
export class CountryController {
  constructor(private countryServie: CountryService) {}

  @Get('')
  find(@Query() dto: BaseQueryDto) {
    return this.countryServie.find(dto)
  }

  @Get('/select')
  findForSelect() {
    return this.countryServie.findForSelect()
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.countryServie.findById(id)
  }

  @Post('')
  create(@Body() dto: CreateCountryDto) {
    return this.countryServie.create(dto)
  }

  @Put('/:id')
  update(@Body() dto: UpdateCountryDto, @Param('id') id: number) {
    return this.countryServie.update(dto, id)
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.countryServie.delete(id)
  }
}
