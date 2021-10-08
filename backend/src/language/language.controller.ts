import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { LanguageDto } from './language.dto'
import { LanguageService } from './language.service'

@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @Get('')
  find() {
    return this.languageService.find()
  }

  @Post('')
  create(@Body() dto: LanguageDto) {
    return this.languageService.create(dto)
  }

  @Put('/:id')
  update(@Body() dto: LanguageDto, @Param('id') id: number) {
    return this.languageService.update(dto, id)
  }
}
