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
import { CreateUnitDto, UpdateUnitDto } from './unit.dto'
import { UnitService } from './unit.service'

@Controller('unit')
export class UnitController {
  constructor(private cityService: UnitService) {}

  @Get('')
  find(@Query() dto: BaseQueryDto) {
    return this.cityService.find(dto)
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.cityService.findById(id)
  }

  @Post('')
  create(@Body() dto: CreateUnitDto) {
    return this.cityService.create(dto)
  }

  @Put('/:id')
  update(@Body() dto: UpdateUnitDto, @Param('id') id: number) {
    return this.cityService.update(dto, id)
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.cityService.delete(id)
  }
}
