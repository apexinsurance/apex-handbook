import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Language } from 'src/entities/Language'
import { Repository } from 'typeorm'
import { LANGUAGE_ALREADY_EXIST } from 'src/common/utils/constants'
import { languages } from './data'

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}
  async create() {
    try {
      return await Promise.all(
        languages.map(async (lang) => {
          const langExist = await this.languageRepository.findOne({
            title: lang.title,
          })
          if (langExist) {
            return Promise.resolve(null)
          } else {
            const newLang = await this.languageRepository.create(lang)
            return Promise.resolve(this.languageRepository.save(newLang))
          }
        }),
      )
    } catch (e) {
      if (+e.code === 23505) {
        throw new ConflictException(LANGUAGE_ALREADY_EXIST)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
