import { Category } from "../enum/category.enum";
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class BaseRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber("MA") // 'MA' stands for Morocco. Change this according to your locale.
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @IsArray()
  @IsOptional()
  @IsObject({ each: true })
  images?: object[]; // This field stores an array of objects
}
