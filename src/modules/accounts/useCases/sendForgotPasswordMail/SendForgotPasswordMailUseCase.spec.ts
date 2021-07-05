/* global spyOn */
import { UsersRepositoryInMemory } from "@modules/accounts/infra/typeorm/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/infra/typeorm/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  dateProvider = new DayjsDateProvider();
  usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
  mailProvider = new MailProviderInMemory();

  beforeEach(() => {
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "512584",
      email: "ju@si.ss",
      name: "Leonard Singleton",
      password: "VznR",
    });

    await sendForgotPasswordMailUseCase.execute("ju@si.ss");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("huw@gunif.bn")
    ).rejects.toEqual(new AppError("User does not exist!"));
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    usersRepositoryInMemory.create({
      driver_license: "087513",
      email: "ki@obieki.ph",
      name: "Leonard Singleton",
      password: "VznR",
    });

    await sendForgotPasswordMailUseCase.execute("ki@obieki.ph");

    expect(generateTokenMail).toBeCalled();
  });
});
