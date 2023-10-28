import { RootEntity } from 'src/common/entity/root.entity';
import { UserRole } from 'src/common/enum/user-role.enum';
import { Post } from 'src/modules/post/entities/post.entity';
import { Entity, Column, ManyToMany } from 'typeorm';

@Entity()
export class User extends RootEntity {
  @Column()
  firstname: string

  @Column({nullable: true})
  lastname: string 

  @Column({unique:true})
  email: string

  @Column({enum:UserRole, type: 'enum', default: UserRole.User})
  role: string

  @Column()
  password: string

  @Column({nullable:true})
  refresh_token: string

  @ManyToMany(() => Post, (post) => post.users)
  posts: Post[]
}
