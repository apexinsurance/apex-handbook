import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { City } from './City'
import { Language } from './Language'

@Entity()
export class CityTranslation {
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
      return City
    },
    (model) => {
      return model.translations
    },
  )
  city: City

  @Column('int')
  cityId: number

  @ManyToOne(
    () => {
      return Language
    },
    (model) => {
      return model.cityTranslations
    },
  )
  language: Language
}
