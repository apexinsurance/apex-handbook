import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm'
import { Country } from './Country'
import { CurrencyRate } from './CurrencyRate'
import { CurrencyTranslation } from './CurrencyTranslation'

@Entity()
export class Currency {
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
      return CurrencyTranslation
    },
    (model) => {
      return model.currency
    },
    {
      cascade: true,
    },
  )
  translations: CurrencyTranslation[]

  @OneToMany(
    () => {
      return CurrencyRate
    },
    (model) => {
      return model.currency
    },
  )
  currencyRates: CurrencyRate[]

  @ManyToOne(
    () => {
      return Country
    },
    (model) => {
      return model.currencies
    },
  )
  country: Country

  @Column('int')
  countryId: number
}
