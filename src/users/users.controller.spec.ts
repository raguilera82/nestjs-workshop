import { Test, TestingModule } from '@nestjs/testing';
import { UsersInmemoryRepositoryService } from './users-inmemory-repository.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, {
        provide: 'usersRepository',
        useClass: UsersInmemoryRepositoryService
      }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all users', async () => {
    const user = {
      name: 'Ruben'
    }
    controller.newUser(user);
    const getAllUsers = await controller.getAllUsers();
    expect(getAllUsers.length).toBe(1);
  })

  it('should get user by id', async () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = await controller.newUser(user);
    const userById = await controller.getUserById(newUser.id);
    expect(userById).toBeDefined();
  })

  it('should new user', async () => {
    const actualSize = await controller.getAllUsers();
    const user = {
      id: '2',
      name: 'Mateo'
    }
    const newUser = await controller.newUser(user);
    expect(newUser).toBe(newUser);
    const postSize = await controller.getAllUsers();
    expect(postSize.length).toBe(actualSize.length + 1);
  })

  it('should update user', async () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = await controller.newUser(user);
    const updateUser = {
      id: newUser.id,
      name: 'Ruben Aguilera'
    }
    controller.updateUser(updateUser.id, updateUser);
    expect(user.name).not.toEqual(updateUser.name);

  })

  it('should delete user', async () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = await controller.newUser(user);
    const actualSize = await controller.getAllUsers();
    await controller.deleteUser(newUser.id);
    const postDeleteSize = await controller.getAllUsers();
    expect(postDeleteSize.length).toBe(actualSize.length - 1);
  })

});
