import { IsString, MinLength, IsOptional, IsNumber } from 'class-validator';

export class AdminUsersUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  country?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  city?: string;
}
