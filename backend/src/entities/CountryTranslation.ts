import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Country } from './Country'
import { Language } from './Language'

@Entity()
export class CountryTranslation {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  shortName: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  fullName: string

  @ManyToOne(
    () => {
      return Country
    },
    (model) => {
      return model.translations
    },
  )
  country: Country

  @Column('int')
  countryId: number

  @ManyToOne(
    () => {
      return Language
    },
    (model) => {
      return model.countryTranslations
    },
  )
  language: Language
}
