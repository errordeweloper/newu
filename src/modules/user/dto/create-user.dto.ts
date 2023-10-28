import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsEmail, IsEnum, IsNotEmpty } from "class-validator"
import { UserRole } from "src/common/enum/user-role.enum"

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstname: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastname: string 

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(UserRole)
  role: string

  @ApiProperty()
  @IsString()
  password: string
}
