import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm'
import { BankTranslation } from './BankTranslation'
import { CityTranslation } from './CityTranslation'
import { CountryTranslation } from './CountryTranslation'
import { CurrencyTranslation } from './CurrencyTranslation'
import { DistrictTranslation } from './DistrictTranslation'
import { RegionTranslation } from './RegionTranslation'
import { UnitTranslation } from './UnitTranslation'

@Entity()
@Unique(['title'])
export class Language {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string

  @Column({
    type: 'boolean',
    default: false,
  })
  isDefault: boolean

  @OneToMany(
    () => {
      return BankTranslation
    },
    (model) => {
      return model.language
    },
  )
  bankTranslations: BankTranslation[]

  @OneToMany(
    () => {
      return CityTranslation
    },
    (model) => {
      return model.language
    },
  )
  cityTranslations: CityTranslation[]

  @OneToMany(
    () => {
      return CountryTranslation
    },
    (model) => {
      return model.language
    },
  )
  countryTranslations: CountryTranslation[]

  @OneToMany(
    () => {
      return CurrencyTranslation
    },
    (model) => {
      return model.language
    },
  )
  currencyTranslations: CurrencyTranslation[]

  @OneToMany(
    () => {
      return DistrictTranslation
    },
    (model) => {
      return model.language
    },
  )
  districtTranslations: DistrictTranslation[]

  @OneToMany(
    () => {
      return RegionTranslation
    },
    (model) => {
      return model.language
    },
  )
  regionTranslations: RegionTranslation[]

  @OneToMany(
    () => {
      return UnitTranslation
    },
    (model) => {
      return model.language
    },
  )
  unitTranslations: UnitTranslation[]
}
