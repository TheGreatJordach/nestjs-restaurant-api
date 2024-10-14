import { DataSource } from "typeorm";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Restaurant } from "../entity/entity.restaurant";
import { CreateReasturantDto } from "../dto/create.restaurant.dto";
import { UpdateRestaurantDto } from "../dto/update.restaurant.dto";

@Injectable()
export class WriteRestaurantService {
  constructor(private readonly dataSource: DataSource) {}

  async newRestaurant(createRestaurantDto: CreateReasturantDto) {
    return await this.dataSource.transaction(async (writeTransaction) => {
      try {
        // Create a new restaurant instance using the DTO
        const newRestaurant = writeTransaction.create(
          Restaurant,
          createRestaurantDto
        );

        if (!newRestaurant) {
          throw new HttpException(
            {
              error: "ServErr",
              success: false,
              data: undefined,
              message: `Failed to create new ${createRestaurantDto.name} `,
            },
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
        // Attempt to save the restaurant
        const savedRestaurant: Restaurant = await writeTransaction.save(
          Restaurant,
          newRestaurant
        );

        return {
          success: true,
          message: `Restaurant created ${createRestaurantDto.name} created successfully.`,
          data: savedRestaurant,
        };
      } catch (error) {
        if (error instanceof ConflictException) {
          throw new HttpException(
            {
              error: "DatabaseErr",
              success: false,
              data: undefined,
              message: `Restaurant already exist: ${error.message}`,
            },
            HttpStatus.CONFLICT
          );
        }
        throw new HttpException(
          {
            error: "ServErr",
            success: false,
            data: undefined,
            message: `Failed to create new ${createRestaurantDto.name} restaurant: ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    });
  }

  async updateRestaurant(
    identifier: number,
    updateRestaurantDto: UpdateRestaurantDto
  ) {
    return this.dataSource.transaction(async (writeTransaction) => {
      try {
        const updatedRestaurant = await writeTransaction.preload<Restaurant>(
          Restaurant,
          { ...updateRestaurantDto, id: identifier }
        );

        const savedRestaurant: Restaurant = await writeTransaction.save(
          Restaurant,
          updatedRestaurant
        );

        return {
          success: true,
          message: `Restaurant ${savedRestaurant.name} updated successfully.`,
          data: savedRestaurant,
        };
      } catch (error) {
        if (error instanceof ConflictException) {
          throw new HttpException(
            {
              error: "DatabaseErr",
              success: false,
              data: undefined,
              message: `Conflict in the name or telephone or email: ${error.message}`,
            },
            HttpStatus.CONFLICT
          );
        }
        throw new HttpException(
          {
            error: "ServErr",
            success: false,
            data: undefined,
            message: `Failed to create new ${updateRestaurantDto.name} restaurant: ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    });
  }
}
