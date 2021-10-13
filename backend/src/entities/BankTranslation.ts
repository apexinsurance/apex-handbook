import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Bank } from './Bank'
import { Language } from './Language'

@Entity()
export class BankTranslation {
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

  @Column({
    type: 'boolean',
    default: false,
  })
  isDefault: boolean

  @ManyToOne(
    () => {
      return Bank
    },
    (model) => {
      return model.translations
    },
  )
  bank: Bank

  @Column('int')
  bankId: number

  @ManyToOne(
    () => {
      return Language
    },
    (model) => {
      return model.bankTranslations
    },
  )
  language: Language
}
