import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const configService = app.get(ConfigService);
  const APP_PORT: number = configService.get<number>("APP_PORT");
  const APP_PREFIX: string = configService.get<string>("APP_PREFIX");
  app.setGlobalPrefix(APP_PREFIX);
  await app.listen(APP_PORT);
}
bootstrap();
