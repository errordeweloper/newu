import { RootEntity } from "src/common/config/entity/root.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Post extends RootEntity {
  @Column()
  title: string

  @Column({nullable: true})
  media: string

  @Column({nullable: true})
  desc: string

  @ManyToMany(() => User, (user) => user.posts, {cascade:true,})
  user: User[]
}
