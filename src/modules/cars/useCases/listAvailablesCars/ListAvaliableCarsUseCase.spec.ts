import { CarsRepositoryInMemory } from "@modules/cars/infra/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Carro Description I",
      daily_rate: 110.0,
      licence_plate: "PUG-1621",
      fine_amount: 40.0,
      brand: "Car Brand 1",
      category_id: "d2ee758d-4724-4e86-b388-36285d8132d2",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Carro Description I",
      daily_rate: 110.0,
      licence_plate: "PUG-1621",
      fine_amount: 40.0,
      brand: "Car Brand Test",
      category_id: "d2ee758d-4724-4e86-b388-36285d8132d2",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car Brand Test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Carro Description I",
      daily_rate: 110.0,
      licence_plate: "PUG-1621",
      fine_amount: 40.0,
      brand: "Car Brand Test",
      category_id: "d2ee758d-4724-4e86-b388-36285d8132d2",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car 3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 4",
      description: "Carro Description I",
      daily_rate: 110.0,
      licence_plate: "PUG-1621",
      fine_amount: 40.0,
      brand: "Car Brand Test",
      category_id: "d2ee758d-4724-4e86-b388-36285d8132d4",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "d2ee758d-4724-4e86-b388-36285d8132d4",
    });

    expect(cars).toEqual([car]);
  });
});
