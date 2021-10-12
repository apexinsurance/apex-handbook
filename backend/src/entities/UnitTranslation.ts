import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Language } from './Language'
import { Unit } from './Unit'

@Entity()
export class UnitTranslation {
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
      return Unit
    },
    (model) => {
      return model.translations
    },
  )
  unit: Unit

  @Column('int')
  unitId: number

  @ManyToOne(
    () => {
      return Language
    },
    (model) => {
      return model.unitTranslations
    },
  )
  language: Language
}
