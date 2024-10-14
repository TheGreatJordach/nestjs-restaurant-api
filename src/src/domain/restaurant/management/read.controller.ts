import { ReadRestaurantService } from "./read.restaurant.service";
import { Controller, Get } from "@nestjs/common";
import { Restaurant } from "../entity/entity.restaurant";

@Controller("read")
export class RestaurantController {
  constructor(private readonly readRestaurant: ReadRestaurantService) {}

  @Get("restaurants")
  async getAllRestaurants(): Promise<Restaurant[]> {
    return await this.readRestaurant.findAll();
  }
}
