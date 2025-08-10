import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { createUserMock } from '../__mocks__/createUser.mock';
import { hash } from 'bcrypt';

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user if email is found', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should throw NotFoundException if email is not found', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw a generic error if findUserByEmail repository fails', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error());

    await expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrow();
  });

  it('should return user if id is found', async () => {
    const user = await service.findUserById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should throw NotFoundException if id is not found', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findUserById(userEntityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return user with relations if id is found', async () => {
    const user = await service.getUserByIdUsingRelations(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should throw ConflictException if email already exists on create', async () => {
    await expect(service.createUser(createUserMock)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should create a new user successfully', async () => {
    const passwordHashed = 'hashed_password';
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    (hash as jest.Mock).mockResolvedValue(passwordHashed);

    const user = await service.createUser(createUserMock);

    expect(userRepository.save).toHaveBeenCalledWith({
      ...createUserMock,
      password: passwordHashed,
      typeUser: 1,
    });
    expect(user).toEqual(userEntityMock);
  });
});
