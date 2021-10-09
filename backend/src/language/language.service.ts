import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Language } from 'src/entities/Language'
import { Repository } from 'typeorm'
import {
  LANGUAGE_ALREADY_EXIST,
  LANGUAGE_NOT_FOUND,
} from 'src/common/utils/constants'
import { LanguageDto } from './language.dto'

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  find(): Promise<Language[]> {
    return this.languageRepository.find()
  }

  async create(dto: LanguageDto): Promise<Language> {
    try {
      const newLanguage = this.languageRepository.create(dto)
      return await this.languageRepository.save(newLanguage)
    } catch (e) {
      if (+e.code === 23505) {
        throw new ConflictException(LANGUAGE_ALREADY_EXIST)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async update(dto: LanguageDto, id: number): Promise<Language> {
    try {
      const language = await this.languageRepository.preload({
        id,
        ...dto,
      })
      if (!language) {
        throw new NotFoundException(LANGUAGE_NOT_FOUND)
      }
      return await this.languageRepository.save(language)
    } catch (e) {
      if (+e.code === 23505) {
        throw new ConflictException(LANGUAGE_ALREADY_EXIST)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async delete(id: number) {
    return this.languageRepository.softDelete(id)
  }
}
