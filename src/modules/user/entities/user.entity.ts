import { UserRole } from 'src/common/config/enum/user-role.enum';
import { Entity, Column } from 'typeorm';

@Entity()
export class User {
  @Column()
  firstname: string

  @Column()
  lastname: string 

  @Column({unique:true})
  email: string

  @Column({enum:UserRole, type: 'enum', default: UserRole.User})
  role: string

  @Column()
  hashed_password: string

  @Column()
  logged_out: boolean
}
