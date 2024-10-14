import { PartialType } from "@nestjs/mapped-types";
import { CreateReasturantDto } from "./create.restaurant.dto";

export class UpdateRestaurantDto extends PartialType(CreateReasturantDto) {}
