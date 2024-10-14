import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { WriteRestaurantService } from "./write.restaurant.service";
import { CreateReasturantDto } from "../dto/create.restaurant.dto";
import { UpdateRestaurantDto } from "../dto/update.restaurant.dto";
import { IdDto } from "../../../../common/dto/id.dto";

@Controller("write")
export class WriteRestaurantController {
  constructor(private readonly writeRestaurant: WriteRestaurantService) {}

  @Post()
  async createRestaurant(@Body() createRestaurantDto: CreateReasturantDto) {
    return await this.writeRestaurant.newRestaurant(createRestaurantDto);
  }

  @Put()
  async updateRestaurant(
    @Param() { id }: IdDto,
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ) {
    return await this.writeRestaurant.updateRestaurant(id, updateRestaurantDto);
  }
}
