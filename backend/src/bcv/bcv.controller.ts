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
import { CreateBcvDto, UpdateBcvDto } from './bcv.dto'
import { BcvService } from './bcv.service'

@Controller('bcv')
export class BcvController {
  constructor(private bcvService: BcvService) {}

  @Get('')
  find(@Query() dto: BaseQueryDto) {
    return this.bcvService.find(dto)
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.bcvService.findById(id)
  }

  @Post('')
  create(@Body() dto: CreateBcvDto) {
    return this.bcvService.create(dto)
  }

  @Put('/:id')
  update(@Body() dto: UpdateBcvDto, @Param('id') id: number) {
    return this.bcvService.update(dto, id)
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.bcvService.delete(id)
  }
}
