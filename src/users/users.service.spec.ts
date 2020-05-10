import { Test, TestingModule } from '@nestjs/testing';
import { UsersInmemoryRepositoryService } from './users-inmemory-repository.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: 'usersRepository',
        useClass: UsersInmemoryRepositoryService
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all users', async () => {
    const user = {
      name: 'Ruben'
    }
    await service.newUser(user);
    expect((await service.getAllUsers()).length).toBe(1);
  })

  it('should get user by id', async () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = await service.newUser(user);
    const userById = await service.getUserById(newUser.id);
    expect(userById).toBeDefined();
  })

  it('should new user', async () => {
    const actualSize = (await service.getAllUsers()).length;
    const user = {
      id: '2',
      name: 'Mateo'
    }
    const newUser = await service.newUser(user);
    expect(newUser).toBe(newUser);
    const postSize = (await service.getAllUsers()).length;
    expect(postSize).toBe(actualSize + 1);
  })

  it('should update user', async () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = await service.newUser(user);
    const updateUser = {
      id: newUser.id,
      name: 'Ruben Aguilera'
    }
    await service.updateUser(updateUser.id, updateUser);
    expect(user.name).not.toEqual(updateUser.name);

  })

  it('should delete user', async () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = await service.newUser(user);
    const actualSize = (await service.getAllUsers()).length;
    service.deleteUser(newUser.id);
    const postDeleteSize = (await service.getAllUsers()).length;
    expect(postDeleteSize).toBe(actualSize - 1);
  })

});
