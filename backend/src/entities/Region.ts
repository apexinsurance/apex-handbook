import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm'
import { City } from './City'
import { Country } from './Country'
import { District } from './District'
import { RegionTranslation } from './RegionTranslation'

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  code: string

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
      return RegionTranslation
    },
    (model) => {
      return model.region
    },
    {
      cascade: true,
    },
  )
  translations: RegionTranslation[]

  @OneToMany(
    () => {
      return District
    },
    (model) => {
      return model.region
    },
  )
  districts: District[]

  @OneToMany(
    () => {
      return City
    },
    (model) => {
      return model.region
    },
  )
  cities: City[]

  @ManyToOne(
    () => {
      return Country
    },
    (model) => {
      return model.regions
    },
  )
  country: Country

  @Column('int')
  countryId: number
}
