import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'
export class RootEntity {
  @PrimaryGeneratedColumn()
  id:number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}