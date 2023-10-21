import { RootEntity } from 'src/common/config/entity/root.entity';
import { UserRole } from 'src/common/config/enum/user-role.enum';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends RootEntity {
  @Column()
  firstname: string

  @Column()
  lastname: string 

  @Column({unique:true})
  email: string

  @Column({enum:UserRole, type: 'enum', default: UserRole.User})
  role: string

  @Column()
  password: string

  @Column({nullable:true})
  refresh_token: string
}
