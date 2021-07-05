import { CarsRepositoryInMemory } from "@modules/cars/infra/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      licence_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      licence_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car2",
        description: "Description Car",
        daily_rate: 100,
        licence_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category",
      })
    ).rejects.toEqual(new AppError("Car already exists !"));
  });

  it("should not be able to create a new car with available true by default", () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: "Car Available",
        description: "Description Car",
        daily_rate: 100,
        licence_plate: "ABCD-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category",
      });

      expect(car.available).toBe(true);
    });
  });
});
