import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
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
