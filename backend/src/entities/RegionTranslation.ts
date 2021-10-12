import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Language } from './Language'
import { Region } from './Region'

@Entity()
export class RegionTranslation {
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
      return Region
    },
    (model) => {
      return model.translations
    },
  )
  region: Region

  @Column('int')
  regionId: number

  @ManyToOne(
    () => {
      return Language
    },
    (model) => {
      return model.regionTranslations
    },
  )
  language: Language
}
