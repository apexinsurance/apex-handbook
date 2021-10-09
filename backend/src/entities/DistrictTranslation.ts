import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { District } from './District'
import { Language } from './Language'

@Entity()
export class DistrictTranslation {
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
      return District
    },
    (model) => {
      return model.translations
    },
  )
  district: District

  @Column('int')
  districtId: number

  @ManyToOne(
    () => {
      return Language
    },
    (model) => {
      return model.districtTranslations
    },
  )
  language: Language
}
