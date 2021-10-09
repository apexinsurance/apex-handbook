import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm'
import { DistrictTranslation } from './DistrictTranslation'
import { Region } from './Region'

@Entity()
export class District {
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
      return DistrictTranslation
    },
    (model) => {
      return model.district
    },
    {
      cascade: true,
    },
  )
  translations: DistrictTranslation[]

  @ManyToOne(
    () => {
      return Region
    },
    (model) => {
      return model.districts
    },
  )
  region: Region

  @Column('int')
  regionId: number
}
