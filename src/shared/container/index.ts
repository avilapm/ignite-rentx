import { container } from "tsyringe";

import "reflect-metadata";
import "@shared/container/providers/DateProvider";
import "@shared/container/providers/MailProvider";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/implementations/UsersRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/implementations/UsersTokenRepository";
import { IUsersRepository } from "@modules/accounts/infra/typeorm/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/IUsersTokensRepository";
import { ICarsRepository } from "@modules/cars/infra/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/infra/repositories/ICategoriesRepository";
import { CarsImagesRepository } from "@modules/cars/infra/repositories/implementations/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/repositories/implementations/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/repositories/implementations/SpecificationsRepository";
import { ICarsImagesRepository } from "@modules/cars/infra/repositories/in-memory/ICarsImagesRepository";
import { ISpecificationRepository } from "@modules/cars/infra/repositories/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/implementations/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokenRepository",
  UsersTokenRepository
);
