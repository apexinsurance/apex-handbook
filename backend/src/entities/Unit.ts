import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { UnitTranslation } from './UnitTranslation'

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  code: string

  @Column({
    type: 'timestamp with time zone',
  })
  startDate: Date

  @Column({
    type: 'timestamp with time zone',
  })
  finishDate: Date

  @OneToMany(
    () => {
      return UnitTranslation
    },
    (model) => {
      return model.unit
    },
    {
      cascade: true,
    },
  )
  translations: UnitTranslation[]
}
