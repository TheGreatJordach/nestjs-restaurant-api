import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "./entity/entity.restaurant";
import { ReadRestaurantService } from "./management/read.restaurant.service";
import { WriteRestaurantService } from "./management/write.restaurant.service";
import { RestaurantController } from "./management/read.controller";
import { WriteRestaurantController } from "./management/write.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [ReadRestaurantService, WriteRestaurantService],
  controllers: [RestaurantController, WriteRestaurantController],
})
export class RestaurantModule {}
