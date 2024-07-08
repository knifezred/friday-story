import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Archive {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 100 })
  name?: string

  @Column({ type: 'varchar', length: 100 })
  cover?: string

  @Column({ type: 'integer' })
  saveTime!: number

  @Column({ type: 'integer' })
  totalTime?: number

  @Column({ type: 'integer' })
  place!: number

  @Column({ type: 'text' })
  data!: string
}
