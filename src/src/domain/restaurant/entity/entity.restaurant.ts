import { Entity } from "typeorm/decorator/entity/Entity";
import { Category } from "../enum/category.enum";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("restaurants")
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  phoneNumber: string;
  @Column()
  address: string;
  @Column({ type: "enum", enum: Category, default: Category.NOT_DEFINED })
  category: Category;

  @Column({ type: "json", nullable: true })
  images?: object[]; // Storing an array of objects in JSON format
}
