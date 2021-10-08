import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm'
import { CityTranslation } from './CityTranslation'
import { Region } from './Region'

@Entity()
export class City {
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
      return CityTranslation
    },
    (model) => {
      return model.city
    },
    {
      cascade: true,
    },
  )
  translations: CityTranslation[]

  @ManyToOne(
    () => {
      return Region
    },
    (model) => {
      return model.cities
    },
  )
  region: Region

  @Column('int')
  regionId: number
}
