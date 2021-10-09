import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm'
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
