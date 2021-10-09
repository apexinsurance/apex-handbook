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
import { CreateDistrictDto, UpdateDistrictDto } from './district.dto'
import { DistrictService } from './district.service'

@Controller('district')
export class DistrictController {
  constructor(private districtService: DistrictService) {}

  @Get('')
  find(@Query() dto: BaseQueryDto) {
    return this.districtService.find(dto)
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.districtService.findById(id)
  }

  @Post('')
  create(@Body() dto: CreateDistrictDto) {
    return this.districtService.create(dto)
  }

  @Put('/:id')
  update(@Body() dto: UpdateDistrictDto, @Param('id') id: number) {
    return this.districtService.update(dto, id)
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.districtService.delete(id)
  }
}
