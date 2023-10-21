import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { env } from "./env.config";
import { User } from "src/modules/user/entities/user.entity";
import { Post } from "src/modules/post/entities/post.entity";

export const typreormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [User, Post],
  synchronize: true,
}