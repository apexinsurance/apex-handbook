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
import { CreateRegionDto, UpdateRegionDto } from './region.dto'
import { RegionService } from './region.service'

@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Get('')
  find(@Query() dto: BaseQueryDto) {
    return this.regionService.find(dto)
  }

  @Get('/select')
  findForSelect() {
    return this.regionService.findForSelect()
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.regionService.findById(id)
  }

  @Post('')
  create(@Body() dto: CreateRegionDto) {
    return this.regionService.create(dto)
  }

  @Put('/:id')
  update(@Body() dto: UpdateRegionDto, @Param('id') id: number) {
    return this.regionService.update(dto, id)
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.regionService.delete(id)
  }
}
