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
import { CreateCityDto, UpdateCityDto } from './city.dto'
import { CityService } from './city.service'

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}

  @Get('')
  find(@Query() dto: BaseQueryDto) {
    return this.cityService.find(dto)
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.cityService.findById(id)
  }

  @Post('')
  create(@Body() dto: CreateCityDto) {
    return this.cityService.create(dto)
  }

  @Put('/:id')
  update(@Body() dto: UpdateCityDto, @Param('id') id: number) {
    return this.cityService.update(dto, id)
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.cityService.delete(id)
  }
}
