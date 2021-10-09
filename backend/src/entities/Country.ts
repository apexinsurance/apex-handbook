import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm'
import { Bank } from './Bank'
import { CountryTranslation } from './CountryTranslation'
import { Currency } from './Currency'
import { Region } from './Region'

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  code: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  ISOCode: string

  @Column({
    type: 'timestamp with time zone',
    default: new Date(),
  })
  startDate: Date

  @Column({
    type: 'timestamp with time zone',
    default: null,
  })
  finishDate: Date

  @DeleteDateColumn({ type: 'timestamp with time zone', default: null })
  deletedDate: Date

  @OneToMany(
    () => {
      return CountryTranslation
    },
    (model) => {
      return model.country
    },
    {
      cascade: true,
    },
  )
  translations: CountryTranslation[]

  @OneToMany(
    () => {
      return Region
    },
    (model) => {
      return model.country
    },
  )
  regions: Region[]

  @OneToMany(
    () => {
      return Bank
    },
    (model) => {
      return model.country
    },
  )
  banks: Bank[]

  @OneToMany(
    () => {
      return Currency
    },
    (model) => {
      return model.country
    },
  )
  currencies: Currency[]
}
