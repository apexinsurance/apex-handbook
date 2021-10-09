import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm'
import { BankTranslation } from './BankTranslation'
import { Country } from './Country'

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  MFO: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  NCEA: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  TIN: string

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
      return BankTranslation
    },
    (model) => {
      return model.bank
    },
    {
      cascade: true,
    },
  )
  translations: BankTranslation[]

  @ManyToOne(
    () => {
      return Country
    },
    (model) => {
      return model.banks
    },
  )
  country: Country

  @Column('int')
  countryId: number
}
