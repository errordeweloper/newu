import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsUrl, IsInt, IsNumber } from "class-validator"

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty({default: 'string.jpg'})
  @IsUrl()
  @IsOptional()
  media: string

  @ApiProperty()
  @IsString()
  desc: string

  @ApiProperty({default:[7, 8, 9]})
  @IsNumber({maxDecimalPlaces: 0}, {each: true})
  // @IsInt({each: true})
  users: number[]
}
