import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Currency } from './Currency'
import { Language } from './Language'

@Entity()
export class CurrencyTranslation {
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
      return Currency
    },
    (model) => {
      return model.translations
    },
  )
  currency: Currency

  @Column('int')
  currencyId: number

  @ManyToOne(
    () => {
      return Language
    },
    (model) => {
      return model.currencyTranslations
    },
  )
  language: Language
}
