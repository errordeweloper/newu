import { IsString, IsOptional, IsEmail, IsStrongPassword } from "class-validator"
import { UserRole } from "src/common/config/enum/user-role.enum"

export class CreatePostDto {
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  media: string

  @IsEmail(UserRole)
  desc: string

  @IsStrongPassword()
  users: number[]
}
