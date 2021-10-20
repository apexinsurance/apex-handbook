import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm'
import { Currency } from './Currency'

@Entity()
export class CurrencyRate {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 5,
    default: 0,
  })
  rate: number

  @Column({
    type: 'timestamp with time zone',
  })
  date: Date

  @Column('int')
  count: number

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

  @ManyToOne(
    () => {
      return Currency
    },
    (model) => {
      return model.currencyRates
    },
  )
  currency: Currency

  @Column('int')
  currencyId: number
}
