import { ConfigService } from "@nestjs/config";
import { Restaurant } from "../../src/domain/restaurant/entity/entity.restaurant";
import { DataSource } from "typeorm";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const logger = new Logger("DbConfiguration");
export const getDbConfig = async (
  configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
  type: "postgres",
  host: configService.getOrThrow("DATASOURCE_HOST"),
  port: configService.getOrThrow("DATASOURCE_PORT"),
  username: configService.getOrThrow("DATASOURCE_USERNAME"),
  password: configService.getOrThrow("DATASOURCE_PASSWORD"),
  database: configService.getOrThrow("DATASOURCE_DATABASE"),
  entities: [Restaurant],
  synchronize: true,
});

export const getDataSourceFactory = async (options) => {
  if (!options) {
    throw new HttpException(
      {
        error: "ConfigError",
        data: undefined,
        message: "DataSourceOption not provided",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  const dataSource = new DataSource(options);
  await dataSource.initialize();
  logger.log("DataSource initialized.🥝");
  return dataSource;
};
