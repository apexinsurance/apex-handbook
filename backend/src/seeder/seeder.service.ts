import { Injectable, Logger } from '@nestjs/common'
import { LanguageService } from 'src/language/language.service'

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    private readonly languageService: LanguageService,
  ) {}

  async seed() {
    await this.languages()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding languages...')
        Promise.resolve(completed)
      })
      .catch((error) => {
        this.logger.error('Failed seeding languages...')
        Promise.reject(error)
      })
  }

  async languages() {
    return await this.languageService
      .create()
      .then((createdLanguages) => {
        this.logger.debug(
          'No. of languages created : ' +
            createdLanguages.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        )
        return Promise.resolve(true)
      })
      .catch((error) => Promise.reject(error))
  }
}
