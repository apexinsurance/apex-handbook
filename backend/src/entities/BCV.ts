import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm'

@Entity()
export class BCV {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 5,
    default: 0,
  })
  value: number

  @Column({
    type: 'timestamp with time zone',
  })
  date: Date

  @DeleteDateColumn({ type: 'timestamp with time zone', default: null })
  deletedDate: Date
}
