import { DataSource } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Restaurant } from "../entity/entity.restaurant";

@Injectable()
export class ReadRestaurantService {
  constructor(private readonly dataSource: DataSource) {}

  // Get all Restaurant => Get /restaurants
  async findAll(): Promise<Restaurant[]> {
    return this.dataSource.transaction(async (readTransaction) => {
      try {
        // Perform the read operation
        return await readTransaction.find(Restaurant);
      } catch (error) {
        throw new HttpException(
          {
            error: "ServErr",
            success: false,
            data: undefined,
            message: `Failed to find restaurants: ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    });
  }
}
